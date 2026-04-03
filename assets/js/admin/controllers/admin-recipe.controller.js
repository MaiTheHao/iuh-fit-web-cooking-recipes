import AuthService from '../../core/services/auth.service.js';
import RecipeRepository from '../../core/repositories/recipe.repository.js';
import UserRepository from '../../core/repositories/user.repository.js';
import Recipe from '../../core/entities/recipe.entity.js';
import Notification from '../../ui/components/notification.js';

class AdminRecipeController {
  #recipeRepo;
  #userRepo;
  #usersMap = {};
  #noti;

  init() {
    if (!AuthService.getInstance().isAdmin()) {
      window.location.href = '/pages/login.html';
      return;
    }
    
    this.#recipeRepo = RecipeRepository.getInstance();
    this.#userRepo = UserRepository.getInstance();
    this.#noti = new Notification();
    
    this.#loadUsers();
    this.#bindEvents();
    this.#renderTable();
  }

  #loadUsers() {
    const users = this.#userRepo.findAll();
    const selectEl = document.getElementById('recipeAuthorId');
    selectEl.innerHTML = '';
    
    users.forEach(u => {
      this.#usersMap[u.id] = u;
      const option = document.createElement('option');
      option.value = u.id;
      option.textContent = u.fullName;
      selectEl.appendChild(option);
    });
  }

  #renderTable() {
    const tbody = document.getElementById('recipesTableBody');
    const recipes = this.#recipeRepo.findAll();
    
    if (recipes.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">No recipes found.</td></tr>';
      return;
    }

    tbody.innerHTML = recipes.map(r => {
      const author = this.#usersMap[r.authorId];
      const authorHtml = author 
        ? `<div class="d-flex align-items-center"><img src="${author.avatar}" class="table-avatar" alt="Avatar"><span>${author.fullName}</span></div>`
        : '<span class="text-muted">Unknown</span>';
      
      return `
        <tr>
          <td><small class="text-muted">${r.id.substring(0, 8)}</small></td>
          <td><img src="${r.image}" class="table-cover" alt="Cover"></td>
          <td>
            <div class="fw-bold">${r.name}</div>
            <div class="text-muted small">${r.code}</div>
          </td>
          <td>${r.cookTime ? r.cookTime + 'm' : '-'}</td>
          <td>${authorHtml}</td>
          <td class="text-end">
            <button class="btn btn-sm btn-outline-primary me-2 btn-edit" data-id="${r.id}"><i data-lucide="edit"></i> Edit</button>
            <button class="btn btn-sm btn-outline-danger btn-delete" data-id="${r.id}"><i data-lucide="trash"></i> Del</button>
          </td>
        </tr>
      `;
    }).join('');

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  #bindEvents() {
    document.getElementById('btnCreateRecipe').addEventListener('click', () => this.#openModal());
    document.getElementById('btnSaveRecipe').addEventListener('click', () => this.#saveRecipe());
    
    document.getElementById('recipesTableBody').addEventListener('click', (e) => {
      const editBtn = e.target.closest('.btn-edit');
      const delBtn = e.target.closest('.btn-delete');
      
      if (editBtn) this.#openModal(editBtn.getAttribute('data-id'));
      if (delBtn) this.#deleteRecipe(delBtn.getAttribute('data-id'));
    });
  }

  #openModal(id = null) {
    const form = document.getElementById('recipeForm');
    form.reset();
    document.getElementById('recipeId').value = id || '';
    
    if (id) {
      const recipe = this.#recipeRepo.findById(id);
      if (recipe) {
        document.getElementById('recipeModalTitle').textContent = 'Edit Recipe';
        document.getElementById('recipeCode').value = recipe.code;
        document.getElementById('recipeName').value = recipe.name;
        document.getElementById('recipeDescription').value = recipe.description;
        document.getElementById('recipeImage').value = recipe.image;
        document.getElementById('recipePrepTime').value = recipe.prepTime;
        document.getElementById('recipeCookTime').value = recipe.cookTime;
        document.getElementById('recipeCategoryId').value = recipe.categoryId;
        document.getElementById('recipeAuthorId').value = recipe.authorId;
        document.getElementById('recipeStars').value = recipe.stars;
        document.getElementById('recipeDirections').value = recipe.directions;
      }
    } else {
      document.getElementById('recipeModalTitle').textContent = 'Create Recipe';
      const currentUser = AuthService.getInstance().getCurrentUser();
      if (currentUser) {
        document.getElementById('recipeAuthorId').value = currentUser.id;
      }
    }
    
    const modal = new bootstrap.Modal(document.getElementById('recipeModal'));
    modal.show();
  }

  #saveRecipe() {
    const form = document.getElementById('recipeForm');
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    try {
      const idInput = document.getElementById('recipeId').value;
      const isUpdate = !!idInput;
      const id = idInput || crypto.randomUUID();
      const code = document.getElementById('recipeCode').value;
      const name = document.getElementById('recipeName').value;
      const description = document.getElementById('recipeDescription').value;
      const image = document.getElementById('recipeImage').value;
      const prepTime = parseInt(document.getElementById('recipePrepTime').value) || 0;
      const cookTime = parseInt(document.getElementById('recipeCookTime').value) || 0;
      const categoryId = document.getElementById('recipeCategoryId').value;
      const authorId = document.getElementById('recipeAuthorId').value;
      const stars = parseInt(document.getElementById('recipeStars').value) || 0;
      const directions = document.getElementById('recipeDirections').value;

      const existing = this.#recipeRepo.findById(id);
      const ingredients = existing ? existing.ingredients : [];
      const nutrition = existing ? existing.nutrition : { calories: 0, protein: 0, carbs: 0, fat: 0, cholesterol: 0 };

      const recipe = new Recipe({
        id, code, name, description, image, prepTime, cookTime, 
        categoryId, authorId, nutrition, ingredients, directions, stars
      });

      if (this.#recipeRepo.save(recipe)) {
            bootstrap.Modal.getInstance(document.getElementById('recipeModal')).hide();
        this.#renderTable();
        if (isUpdate) {
          this.#noti.success('Success', 'Update successfully');
        } else {
          this.#noti.success('Success', 'Create successfully');
        }
      } else {
        this.#noti.error('Error', 'Failed to save recipe');
      }
    } catch (e) {
      this.#noti.error('Error', `Error: ${e.message}`);
    }
  }

  #deleteRecipe(id) {
    if (confirm('Are you sure you want to delete this recipe?')) {
      if (this.#recipeRepo.delete(id)) {
        this.#renderTable();
        this.#noti.success('Success', 'Delete successfully');
      } else {
        this.#noti.error('Error', 'Failed to delete recipe');
      }
    }
  }
}

export default AdminRecipeController;
