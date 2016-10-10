
module.exports = function(name) {
  console.log('create pixi project named: ' + name)
    console.log('clone template from \'https://github.com/MagicalPixi/Template.git\'')
    require('child_process').execSync('git clone https://github.com/MagicalPixi/Template.git ' + name, { stdio: 'inherit' })
    console.log('exec npm install in ./' + name)
    require('child_process').execSync('npm install --prefix ./' + name + '/', { stdio: 'inherit' })
}
