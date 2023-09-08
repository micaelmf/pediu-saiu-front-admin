const Crawler = require("crawler")

let obselete = [] // Array of what was crawled already

let c = new Crawler()

function crawlAllUrls(url, processResult) {
  const base = new URL(url)
  const isInternal = (url) => new URL(url, base).hostname === base.hostname;

  console.log(`Crawling ${url}`)
  c.queue({
    uri: url,
    callback: function (err, res, done) {
      if (err) throw err
      processResult(res)
      let $ = res.$
      try {
        let urls = $("a")
        Object.keys(urls).forEach((item) => {
          if (urls[item].type === 'tag') {
            let href = urls[item].attribs.href
            if (!href || !isInternal(href) || href.startsWith('#') || href.startsWith('javascript:')) return
            href = href.split('#')[0]

            const UrlHref = new URL(href.trim(), res.options.uri)

            href = UrlHref.href
            if (href && !obselete.includes(href)) {
              obselete.push(href)
              // Slow down the
              setTimeout(function() {
                crawlAllUrls(href, processResult)
              }, 5000)
            }
          }
        })
      } catch (e) {
        if (res.request.uri.path === '/') {
          indexHref = new URL('/index.html', res.options.uri).href
          obselete.push(indexHref)
          crawlAllUrls(indexHref, processResult)
          return
        }

        console.error(`Encountered an error crawling ${url}. Aborting crawl.`)
        done()
      }
      done()
    }
  })
}

module.exports = crawlAllUrls
