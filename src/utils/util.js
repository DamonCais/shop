export function BlockToPage(blocks) {
  const obj = {
    pageTitle: blocks[0].pageTitle,
    pageDescription: blocks[0].pageDescription,
    sortIndex: blocks[0].sortIndex,
    status: 'active',
    blocks: blocks.slice(1)
  }
  return obj
}

export function PageToBlock(data) {
  const blocks = []
  blocks[0] = {
    pageTitle: typeof (data.pageTitle) === 'object' ? data.pageTitle : { zh: '', en: '' },
    pageDescription: typeof (data.pageDescription) === 'object' ? data.pageDescription : { zh: '', en: '' },
    sortIndex: typeof (data.sortIndex) === 'number' ? data.sortIndex : 0,
    type: 'header'
  }
  blocks.push(...data.blocks)
  return blocks
}

export function createObjByBtn(btn) {
  let obj = {}
  switch (btn) {
    case 'BTN_NAVGROUP':
      obj = {
        type: 'navgroup',
        template: 'image-text',
        items: [{
          image: {
            url: 'https://img.yzcdn.cn/public_files/2018/01/30/585dae8447d80013ef9344adc973c6ee.png?imageView2/2/w/520/h/0/q/75/format/webp'
          },
          title: {
            zh: '文本标题',
            en: 'English Title'
          }
        },
        {
          image: {
            url: 'https://img.yzcdn.cn/public_files/2018/01/30/585dae8447d80013ef9344adc973c6ee.png?imageView2/2/w/520/h/0/q/75/format/webp'
          },
          title: {
            zh: '文本标题',
            en: 'English Title'
          }
        },
        {
          image: {
            url: 'https://img.yzcdn.cn/public_files/2018/01/30/585dae8447d80013ef9344adc973c6ee.png?imageView2/2/w/520/h/0/q/75/format/webp'
          },
          title: {
            zh: '文本标题',
            en: 'English Title'
          }
        }
        ]

      }
      break
    case 'BTN_BANNER':
      obj = {
        type: 'banner',
        template: 'swiper',
        items: [{
          image: {
            url: 'https://img.yzcdn.cn/public_files/2018/01/30/585dae8447d80013ef9344adc973c6ee.png?imageView2/2/w/520/h/0/q/75/format/webp'
          },
          title: ''
        }]

      }
      break
    case 'BTN_TITLE':
      obj = {
        type: 'title',
        template: 'left',

        items: [{
          title: {
            zh: '文本标题',
            en: 'English Title'
          },
          subtitle: {
            zh: '文本副标题',
            en: 'English Subtitle'
          }
          // linkType: "product",
          // linkId: "...object-id..."
        }]

      }
      break
    case 'cell':
      obj = {
        type: 'cell',
        data: {
          left: '',
          center: '',
          right: '',
          islink: true
        }
      }
      break
    case 'BTN_PRODUCTGROUP':
      obj = {
        type: 'productgroup',
        template: 'double',
        source: 'product',
        items: []
      }
      break
    case 'BTN_SPACER':
      obj = {
        type: 'spacer',

        height: 30,
        color: '#ddd'
      }
      break
  }
  return obj
}
