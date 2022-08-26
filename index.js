/* deanimated
 * Copyright (c) 2022 Penguin_Spy
 * See LICENSE for full text
*/

const { Plugin } = require('powercord/entities')
const { inject, uninject, isInjected } = require('powercord/injector')
const { React, getModule, getAllModules, getModuleByDisplayName, i18n: { Messages } } = require('powercord/webpack')

//const Settings = require('./components/Settings.jsx')

const overwrites = {}

function overwrite(id, mod, funcName, patch) {
  overwrites[id] = { mod, funcName, original: mod[funcName] }
  mod[funcName] = patch
}

function unoverwrite(id) {
  if (!overwrites[id]) return;
  const { mod, funcName, original } = overwrites[id]
  mod[funcName] = original
}


module.exports = class Deanimated extends Plugin {

  async startPlugin() {
    /*powercord.api.i18n.loadAllStrings(require('./i18n'))
    this.loadStylesheet('style.css')
    powercord.api.settings.registerSettings('ppl-moe', {
      category: this.entityID,
      label: Messages.PPL_MOE,
      render: Settings
    })*/

    //const ConnectedLayers = await getModule(m => m.default?.displayName === "ConnectedLayers")
    const TransitionGroup = await getModule(m => m.default?.displayName === "TransitionGroup")

    console.log(TransitionGroup)

    /*inject("deanimated-test1", ConnectedLayers, 'default', (args, res) => {
      console.group("ConnectedLayers.default")
      console.log(args)
      console.log(res)

      console.groupEnd()
      return res;
    })*/

    /*inject("deanimated-test2", TransitionGroup, 'default', (args) => {
      console.group("TransitionGroup.default")
      console.log(args)

      console.groupEnd()
      return args;
    })*/
    /*inject("deanimated-test3-pre", TransitionGroup.default.prototype, '_perform', function ([key, will, did, r]) {
      console.group("TransitionGroup.prototype._perform-pre")

      //will = undefined;

      console.log(key, will, did, r)

      console.groupEnd()
      return [key, will, did, r];
    }, true)*/

    /*inject("deanimated-TransitionGroup-render", TransitionGroup.default.prototype, 'render', function (args, res) {
      console.group("TransitionGroup.prototype.render")
      console.log(args)
      console.log(res)
      console.log(this)

      console.groupEnd()
      return res
    })*/


    inject("deanimated-test3", TransitionGroup.default.prototype, '_perform', function (args, res) {
      console.group("TransitionGroup.prototype._perform")
      console.log(args)
      console.log(res)
      console.log(this)
      const Layer = this?._keyChildMapping?.[".$layer-base"]?.__proto__

      if (Layer && !isInjected("deanimated-Layer-animateIn")) {
        overwrite("deanimated-Layer-animateIn", Layer, 'animateIn', function (args) {
          console.group("deanimated-Layer-animateIn")
          console.log(args)
          console.log(this)

          const layer = this.containerRef.current
          layer.classList.remove(layer.classList[layer.classList.length - 1])
          layer.removeAttribute("style")

          console.groupEnd()
          return args
        })

        overwrite("deanimated-Layer-animateOut", Layer, 'animateOut', function (args) {
          console.group("deanimated-Layer-animateOut")
          console.log(args)
          console.log(this)

          args()

          console.groupEnd()
          return args
        })

        overwrite("deanimated-Layer-animateUnder", Layer, 'animateUnder', function (args) {
          console.group("deanimated-Layer-animateUnder")
          console.log(args)
          console.log(this)

          const layer = this.containerRef.current
          layer.classList.remove(layer.classList[layer.classList.length - 1])
          layer.classList.remove(layer.classList[layer.classList.length - 1])
          layer.removeAttribute("style")

          console.groupEnd()
          return args
        })

        /*inject("deanimated-Layer-animateIn", Layer, 'animateIn', function (args) {
          console.group("deanimated-Layer-animateIn")
          console.log(args)
          console.log(this)

          console.groupEnd()
          return args
        }, true)

        inject("deanimated-Layer-animateOut", Layer, 'animateOut', function (args) {
          console.group("deanimated-Layer-animateOut")
          console.log(args)
          console.log(this)

          console.groupEnd()
          return args
        }, true)

        inject("deanimated-Layer-animateUnder", Layer, 'animateUnder', function (args) {
          console.group("deanimated-Layer-animateUnder")
          console.log(args)
          console.log(this)

          console.groupEnd()
          return args
        }, true)
        */

      }

      console.groupEnd()
      return res;
    })

    /*inject("deanimated-test4-pre", TransitionGroup.default.prototype, '_handleDonePerform', function (args) {
      console.group("TransitionGroup.prototype._handleDonePerform-pre")
      console.log(args)

      console.groupEnd()
      return args;
    }, true)
    inject("deanimated-test4", TransitionGroup.default.prototype, '_handleDonePerform', function (args, res) {
      console.group("TransitionGroup.prototype._handleDonePerform")
      console.log(args)
      console.log(res)
      console.log(this)

      console.groupEnd()
      return res;
    })*/
  }

  pluginWillUnload() {
    /*if (powercord.api.connections.unregisterConnection) {
      powercord.api.connections.unregisterConnection('ppl-moe')
    }
    powercord.api.settings.unregisterSettings('ppl-moe')
    */
    uninject('deanimated-test1')
    uninject('deanimated-test3')
    uninject('deanimated-test3-pre')
    /*uninject('deanimated-Layer-animateIn')
    uninject('deanimated-Layer-animateOut')
    uninject('deanimated-Layer-animateUnder')*/
    unoverwrite("deanimated-Layer-animateIn")
    unoverwrite("deanimated-Layer-animateOut")
    unoverwrite("deanimated-Layer-animateUnder")
  }
}