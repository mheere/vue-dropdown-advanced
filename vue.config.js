module.exports = {
  lintOnSave: false,
  configureWebpack: {
    output: {
      libraryExport: 'default'
    }
	},
	css: { extract: false },
	productionSourceMap: false
};
