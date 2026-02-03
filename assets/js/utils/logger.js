const Logger = {
	styles: {
		reset: 'color: inherit;',
		info: 'background: #0ea5e9; color: white; font-weight: bold; padding: 2px 6px; border-radius: 3px;',
		success: 'background: #10b981; color: white; font-weight: bold; padding: 2px 6px; border-radius: 3px;',
		warning: 'background: #f59e0b; color: white; font-weight: bold; padding: 2px 6px; border-radius: 3px;',
		error: 'background: #ef4444; color: white; font-weight: bold; padding: 2px 6px; border-radius: 3px;',
		debug: 'background: #8b5cf6; color: white; font-weight: bold; padding: 2px 6px; border-radius: 3px;',
	},

	log(message, data = null) {
		console.log(`%cLOG%c ${message}`, this.styles.reset, this.styles.reset, data || '');
	},

	info(message, data = null) {
		console.log(`%cINFO%c ${message}`, this.styles.info, this.styles.reset, data || '');
	},

	success(message, data = null) {
		console.log(`%cSUCCESS%c ${message}`, this.styles.success, this.styles.reset, data || '');
	},

	warn(message, data = null) {
		this.warning(message, data);
	},

	warning(message, data = null) {
		console.warn(`%cWARNING%c ${message}`, this.styles.warning, this.styles.reset, data || '');
	},

	error(message, error = null) {
		console.error(`%cERROR%c ${message}`, this.styles.error, this.styles.reset, error || '');
	},

	debug(message, data = null) {
		console.debug(`%cDEBUG%c ${message}`, this.styles.debug, this.styles.reset, data || '');
	},

	table(data) {
		console.table(data);
	},

	time(label) {
		console.time(label);
	},

	timeEnd(label) {
		console.timeEnd(label);
	},
};

export default Logger;
