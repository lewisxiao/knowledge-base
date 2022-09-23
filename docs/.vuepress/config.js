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
                text: '技术文章',
                link: '/tech-article/',
                children: [
                    {
                        text: '云计算',
                        link: '/tech-article/cloud-computing'
                    },
                    {
                        text: 'Java',
                        children: [
                            {
                                text: 'JDK17又要免费了?',
                                link: '/tech-article/java/jdk-free-again'
                            },
                            {
                                text: '揭开字节码技术的面纱',
                                link: '/tech-article/java/bytecode'
                            }
                        ]
                    },
                    {
                        text: '操作系统',
                        children: [
                            {
                                text: '聊聊密集型任务',
                                link: '/tech-article/operating-system/task'
                            }
                        ]
                    },
                    {
                        text: '未分类',
                        children: [
                            {
                                text: '软件设计原则',
                                link: '/tech-article/other/design-principle'
                            },
                            {
                                text: '如何更新本地关联的远程仓库地址',
                                link: '/tech-article/other/update-git-repo'
                            }
                        ]
                    }
                ]
            },
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
                        text: '并发编程',
                        link: '/java/concurrent',
                        children: [
                            {
                                text: 'CountDownLatch',
                                link: '/java/concurrent/count-down-latch'
                            },
                            {
                                text: 'CyclicBarrier',
                                link: '/java/concurrent/cyclic-barrier'
                            }
                        ]
                    },
                    {
                        text: 'Java虚拟机',
                        children: [
                            {
                                text: '认识JVM启动参数',
                                link: '/java/jvm/start-param'
                            },
                            {
                                text: '垃圾收集器',
                                link: '/java/jvm/gc'
                            },
                            {
                                text: '性能调优分析',
                                link: '/java/jvm/performance-tunning'
                            }
                        ]
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
                text: '中间件',
                link: '/middleware',
                children: [
                    {
                        text: 'RocketMQ',
                        link: '/middleware/rocketmq',
                        children: [
                            {
                                text: '四大组件',
                                link: '/middleware/rocketmq/rocketmq'
                            }
                        ]
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
                        text: '前端项目集',
                        link: '/open-source-project/frontend',
                        children: [
                            {
                                text: '后台管理模板',
                                link: '/open-source-project/frontend/admin-template'
                            }
                        ]
                    },
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