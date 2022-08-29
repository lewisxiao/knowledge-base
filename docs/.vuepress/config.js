module.exports = {
    title: '我的知识库',
    description: '基于VuePress的个人知识库',
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
        ],
        sidebar: [
            {
                title: 'Java',
                path: '/java/',
                collapsable: true,
                sidebarDepth: 1,
                children: [
                  '/java/base',
                  '/java/jvm'
                ]
            },
            {
                title: '开源项目集',
                path: '/opensourceproject/',
                collapsable: true,
                sidebarDepth: 1,
                children: [
                  '/opensourceproject/backend'
                ]
            }
          ]
    }
}