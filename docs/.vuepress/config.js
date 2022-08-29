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
            },
            {
                text: '工具集',
                link: '/tools/',
                children: [
                    {
                        text: 'Git',
                        link: '/tools/git/',
                        children: [
                            {
                                text: '分支模型',
                                link: '/tools/git/branch-model',
                            },
                            {
                                text: 'Commit Message规范',
                                link: '/tools/git/commit-message',
                            }
                        ]
                    }
                ]
            },
        ]
    })
}