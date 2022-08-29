import { defaultTheme } from '@vuepress/theme-default'

export default {
    title: '我的知识库',
    description: '基于VuePress的个人知识库',
    theme: defaultTheme({
        nav: [
            { text: 'Home', link: '/' },
        ],
        sidebar: [
            {
                text: 'Java',
                link: '/java/',
                children: [
                    {
                        text: 'Java基础',
                        link: '/java/base'
                    },
                    {
                        text: 'Java虚拟机',
                        link: '/java/jvm'
                    }
                ]
            },
            {
                text: '开源项目集',
                link: '/open-source-project/',
                children: [
                    {
                        text: '后端项目集',
                        link: '/open-source-project/backend'
                    }
                ]
            }
        ]
    })
}