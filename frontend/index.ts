import { Container } from './components/Container/index'
import { Main } from './components/Main'
import router from './router'
import './static/index.html'
import './static/styles/base.scss'
import RouterView from './view/ContainerView/RouterView'
import MainView from './view/MainView'
const body = document.body
const main = new Main(new MainView())
const container = new Container(new RouterView())

main.mount(body)
container.mount(body)
router.parseURL()
