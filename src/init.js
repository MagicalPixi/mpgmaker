
var prompt = require('prompt')
prompt.message = 'mpgmaker'
var schema = {
  properties: {
    qiniu: {
      description: 'need qiniu upload task?(yes/[no])'
    },
    qiniu_accesskey: {
      description: 'input your qiniu accesskey(enter return to input by yourself)',
      type: 'string',
      ask: function() {
        return prompt.history('qiniu').value == 'yes'
      }
    },
    qiniu_secretkey: {
      description: 'input your qiniu secretkey(enter return to input by yourself)',
      type: 'string',
      ask: function() {
        return prompt.history('qiniu').value == 'yes'
      }
    },
    qiniu_bucket: {
      description: 'input your qiniu bucket name(enter return to input by yourself)',
      type: 'string',
      ask: function() {
        return prompt.history('qiniu').value == 'yes'
      }
    },
    tiny: {
      description: 'need tinypng compress task?(yes/[no])',
    },
    tinykey: {
      description: 'input your tinypng key(enter return to input by yourself)',
      type: 'string',
      ask: function() {
        return prompt.history('tiny').value == 'yes'
      }
    }
  }
}

var npminstall = function(result, name) {
  console.log('exec npm install in ./' + name)
  require('child_process').execSync('cd ./'+ name + ' && cnpm install', { stdio: 'inherit' })
}

var copy = function(result, name) {
  var currentDir = process.cwd()
  var path = require('path')
  var templateDir = path.resolve(__dirname, '../template')
  console.log('copy template to ' + currentDir + '/' + name)
  require('child_process').execSync('cp -rf ' + templateDir + ' ' + currentDir + '/' + name, { stdio: 'inherit' })
}

var init = function(result, name) {
  copy(result, name)
  npminstall(result, name)
}

module.exports = function(name) {
  var currentDir = process.cwd()
  var fs = require('fs')
  var exist = false
  try {
    fs.statSync(currentDir + '/' + name)
    exist = true
  } catch (err) {
    exist = false
  }
  if (exist) {
    console.log('dir named: ' + name + 'is existed')
    return
  }
  prompt.get(schema, function(err, result) {
    if (err) return
    init(result, name)
  })
}
