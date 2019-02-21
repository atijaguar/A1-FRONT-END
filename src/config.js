import * as isActive from './activityFns.js'
import * as singleSpa from 'single-spa'

singleSpa.registerApplication('desktop', SystemJS.import('desktop!sofe'), isActive.desktop)
singleSpa.registerApplication('grid', SystemJS.import('grid!sofe'), isActive.grid)
singleSpa.registerApplication('report', SystemJS.import('report!sofe'), isActive.report)

singleSpa.start()
