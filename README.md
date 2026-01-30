# Recipe4f

A frontend-focused web application designed to showcase cooking recipes and blogs. This project demonstrates the implementation of a client-side Multi-Page Application (MPA) using vanilla web technologies and simulating backend functionality with LocalStorage.

> **Note**: This is a coursework assignment for **Industrial University of Ho Chi Minh City (IUH)**.

## Built With

[![HTML5](https://img.shields.io/badge/HTML5-E34C26?style=for-the-badge&logo=html5&logoColor=white)](https://html.spec.whatwg.org/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://www.javascript.com/)
[![LocalStorage](https://img.shields.io/badge/LocalStorage-FFA500?style=for-the-badge&logo=database&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

## Architecture & Structure

The project follows a **Simple Layered Architecture** with clear separation of concerns:

```mermaid
graph LR
    %% Modern Professional Styles
    classDef user fill:#f1f5f9,stroke:#64748b,stroke-width:2px,color:#1e293b
    classDef layer fill:#ffffff,stroke:#3b82f6,stroke-width:2px,color:#1e3a8a,font-weight:600
    classDef model fill:#ffffff,stroke:#94a3b8,stroke-width:1.5px,color:#64748b,stroke-dasharray: 4 4
    classDef database fill:#ecfdf5,stroke:#10b981,stroke-width:2px,color:#065f46,font-weight:600

    %% Nodes
    User([fa:fa-user User Browser]):::user

    subgraph App ["  fa:fa-laptop-code Recipe4f System Scope  "]
        direction LR
        UI["fa:fa-project-diagram View Layer<br/><small>HTML5 / CSS3 / VanillaJS</small>"]:::layer
        Service["fa:fa-cogs Service Layer<br/><small>Business Logic</small>"]:::layer
        Repo["fa:fa-database Data Access<br/><small>Repository Pattern</small>"]:::layer
        Entity[["fa:fa-box Entities"]]:::model
    end

    DB[("LocalStorage")]:::database

    %% Minimalist Connectors
    User <==> UI
    UI <==> Service
    Service <==> Repo
    Repo -.- Entity
    Repo <==> DB

    %% Link Aesthetics
    linkStyle default stroke:#94a3b8,stroke-width:1.5px
    linkStyle 0,1,2,4 stroke:#3b82f6,stroke-width:2px
```

**Note**: This architecture is simplified without complex DTOs to maintain lightweight and straightforward design.

## Key Features

- **Recipe Showcase**: Interactive browsing of detailed cooking recipes
- **Blog Module**: A dedicated section for cooking articles and news
- **Virtual Database**: Full CRUD operations using browser `LocalStorage`
- **Dynamic Rendering**: UI components are generated via JavaScript
- **Responsive Design**: Optimized for Desktop, Tablet, and Mobile devices

## Getting Started

Open `index.html` in any modern web browser from your project workspace.

- _Recommended_: Use "Live Server" extension in VS Code
