const fixedPath = location.href.replace('/-/', '/#/')
if (fixedPath !== location.href) {
  location.href = fixedPath
}

function install(hook, vm) {
  const dom = Docsify.dom
  const disqus = vm.config.disqus
  if (!disqus) {
    throw Error('$docsify.disqus is required')
  }

  hook.init(_ => {
    const script = dom.create('script')

    script.async = true
    script.src = `https://${disqus}.disqus.com/embed.js`
    script.setAttribute('data-timestamp', +new Date())
    dom.appendTo(dom.body, script)
  })

  hook.mounted(_ => {
    const div = dom.create('div')
    div.id = 'disqus_thread'
    const main = dom.getNode('#main')
    div.style = `width: ${main.clientWidth}px; margin: 0 auto 20px;`
    //if (vm.route.file.toLowerCase().indexOf('readme')) return;
    dom.appendTo(dom.find('.content'), div)

    // eslint-disable-next-line
    window.disqus_config = function () {
      this.page.url = location.origin + '/-' + vm.route.path
      this.page.identifier = vm.route.path
      this.page.title = document.title
    }

    div.style.visibility = 'hidden';
  })

  hook.afterEach(function (html, next) {
    // hide disqus on pages with small amount of text...
    // (html.indexOf('data-lang') >= 0);
    //this.showDiscuss = (html.length > 2000); 
    next(html);
  });

  hook.doneEach(function (html) {
    if (typeof window.DISQUS !== 'undefined') {
      dom.find('#disqus_thread').style.visibility = (this.showDiscuss ? 'visible' : 'hidden');
      window.DISQUS.reset({
        reload: true,
        config: function () {
          this.page.url = location.origin + '/-' + vm.route.path
          this.page.identifier = vm.route.path
          this.page.title = document.title
        }
      })
    }
  })
}

$docsify.plugins = [].concat(install, $docsify.plugins)