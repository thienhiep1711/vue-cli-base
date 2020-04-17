import { ready } from 'lib/dom'
import { pipe } from 'lib/utils'
import initializeModules from 'lib/init-modules'
import { initVue as initializeVue, initVuex, initVueSingleFile } from 'app/vue'

ready(pipe(initVuex, initializeVue, initVueSingleFile, initializeModules))
