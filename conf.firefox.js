const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
	baseUrl: 'http://cafetownsend-angular-rails.herokuapp.com',
	framework: 'jasmine2',
  directConnect: true,
	capabilities: {
    'browserName': 'firefox',
	},
  //  for multi-browser test, comment capabilities, uncomment this part::
	//  multiCapabilities: [{
	//    browserName: 'firefox'
	//  }, {
	//    browserName: 'chrome'
	//  }]
	// Options to be passed to Jasmine-node.
	jasmineNodeOpts: {
		isVerbose: true,
		includeStackTrace: true,
		showColors: true,       // Use colors in the command line report.
		defaultTimeoutInterval: 30000,
	},

	getPageTimeout : 100000,

  //  specs: ['test/specs/login.js'],
	specs: ['test/specs/*'],
  suites: {
    login: 'test/specs/login.js',
    employees: ['test/specs/employees.js'],
    all: ['test/specs/*.js']
  },

  //  async/await will be utilized instead of control-flow
	SELENIUM_PROMISE_MANAGER: false,

	params: {
		userName: 'Luke',
		userPswd: 'Skywalker',
		title:    'CafeTownsend-AngularJS-Rails',
		tstData: [ 
			{ name:'aaLary',  lastname: 'aaBird', startdate: '1986-06-12', email:'z.a@c.com' },
			{ name:'zzMarco', lastname: 'zzVanBasten', startdate: '1988-06-22', email:'z.a@c.nl' },
			{ name:'kkMagic', lastname: 'kkJohnson', startdate: '1987-06-19', email:'z.a@c.us' },
			{ name:'zzMagic', lastname: 'zzJohnson', startdate: '1987-06-19', email:'z.a@c.us' },
			{ name:'aaEdge1', lastname: 'aaTryEmailWeird', startdate: '1987-06-19', email:'z..a@c.edge' },
			{ name:'aaEdge2', lastname: 'aaTryDateFuture', startdate: '2020-06-19', email:'z.a@c.edge' },
		],
	},

	onPrepare() {
		jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
		browser.driver.manage().window().setSize(600, 768);
	}
}


