const GULP_CONFIG = {
	// 输出目录
	output_path: 'dist',
	// 开发目录
	target_path: 'src',

	build_option: {
		init: true,
		TARGET_PATH: ['src/**'],
		IGNORE_PATH: ['node_modules/**', 'src/app.less', 'src/**/*.less']
	},

	eslint_option: {
		init: false,
		TARGET_PATH: ['src/**/*.js', 'src/app.js'],
		IGNORE_PATH: ['node_modules/**', 'src/plugins/**'],
		configFile: './.eslintrc.js'
	},

	script_option: {
		init: false,
		TARGET_PATH: ['src/**/*.js', 'src/app.js'],
		IGNORE_PATH: ['node_modules/**']
	},

	style_option: {
		init: true,
		TARGET_PATH: ['src/app.less', 'src/**/*.less'],
		IGNORE_PATH: []
	},

	typescript_option: {
		init: true,
		TARGET_PATH: ['src/**/*.ts', 'src/app.ts']
	}
}

module.exports = GULP_CONFIG;