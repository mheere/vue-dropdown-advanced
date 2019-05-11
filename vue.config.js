module.exports = {
  lintOnSave: false,
  configureWebpack: {
    output: {
      libraryExport: 'default'
    }
	},
	css: { extract: true },
	productionSourceMap: false
};
