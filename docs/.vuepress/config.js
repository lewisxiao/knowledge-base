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
                collapsible: false,
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
                text: 'Android',
                link: '/android/',
                collapsible: false,
            },
            {
                text: 'Linux',
                link: '/linux/',
                collapsible: false,
                children: [
                    {
                        text: '常用命令',
                        link: '/linux/command'
                    }
                ]
            },
            {
                text: 'Spring',
                link: '/spring/',
                collapsible: false,
                children: [
                    {
                        text: 'Spring Core模块学习',
                        link: '/spring/spring-core'
                    },
                    {
                        text: '重要注解',
                        link: '/spring/important-annotation'
                    },
                    {
                        text: '负载均衡',
                        link: '/spring/load-balance'
                    },
                    {
                        text: 'OpenFeign的使用详解',
                        link: '/spring/spring-cloud-starter-openfeign'
                    }
                ]
            },
            {
                text: 'Redis',
                link: '/redis/',
                collapsible: false,
            },
            {
                text: '开源项目集',
                link: '/open-source-project/',
                collapsible: false,
                children: [
                    {
                        text: '后端项目集',
                        link: '/open-source-project/backend'
                    }
                ]
            },
            {
                text: '数据库',
                link: '/database/',
                collapsible: false,
                children: [
                    {
                        text: 'MySQL',
                        link: '/database/mysql/',
                        children: [
                            { text: '索引', link: '/database/mysql/sql-index' },
                            { text: '查看mysql的连接情况', link: '/database/mysql/operation' },
                        ],
                    },
                    { text: '分库分表', link: '/database/data-partition' },
                    { text: '动态数据源', link: '/database/dynamic-ds' },
                ]
            },
            {
                text: '工具集',
                link: '/tools/',
                collapsible: false,
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
                    },
                    {
                        text: 'Gradle',
                        link: '/tools/gradle/',
                        children: [
                            {
                                text: '依赖管理',
                                link: '/tools/gradle/dependency',
                            },
                            {
                                text: '常见问题',
                                link: '/tools/gradle/qa',
                            }
                        ]
                    }
                ]
            },
        ]
    })
}