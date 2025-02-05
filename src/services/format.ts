export const formatHTML = (html: string, options = { removeEmptyComments: true }) => {
  var indentation = '  '
  var result = ''
  var indent = ''
  if (options.removeEmptyComments) {
    html = html.replaceAll('<!---->', '')
  }
  html.split(/>\s*</).forEach(function (element) {
    if (element.match(/^\/\w/)) {
      indent = indent.substring(indentation.length)
    }
    result += indent + '<' + element + '>\r\n'
    if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith("input")) {
      indent += indentation
    }
  })
  return result.substring(1, result.length - 3)
}
