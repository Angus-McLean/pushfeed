// (function () {

// 	// var module =  angular.module(ApplicationConfiguration.applicationModuleName);
// 	var module = angular.module('navigation');
// 	module.service('navSecService', function () {
// 		this.sections = [{
// 		    name : 'Profile',
// 		    type : 'link',
// 		    pages : [{
		        
// 		    }]
// 		},{
// 		    name : 'Tags',
// 		    type : 'toggle',
// 		    pages : [{
// 		        name : 'mcHacks2016',
// 		        type : 'link',
// 		        state : 'tags/mcHacks2016',
// 		        icon : 'fa fa-group'
// 		    },{
// 		        name : 'mcgill',
// 		        type : 'link',
// 		        state : 'tags/mcgill',
// 		        icon : 'fa fa-group'
// 		    },{
// 		        name : 'montreal',
// 		        type : 'link',
// 		        state : 'tags/montreal',
// 		        icon : 'fa fa-group'
// 		    },{
// 		        name : 'hackathon',
// 		        type : 'link',
// 		        state : 'tags/hackathon',
// 		        icon : 'fa fa-group'
// 		    },{
// 		        name : 'projects',
// 		        type : 'link',
// 		        state : 'tags/projects',
// 		        icon : 'fa fa-group'
// 		    }]
// 		}];
// 	});

// })();


(function(){

'use strict';

  angular.module('navigation')
  .factory('menu', ['$location', '$rootScope', function ($location, $rootScope) {

        console.log('menuFactory')

        var sections = [];

        sections.push({
		    name : 'Profile',
		    type : 'link',
		    state : 'feed.me',
		    sref : 'feed({feedname:"me"})',
		    url : '/feed/me',
		    icon : 'fa fa-group'
		});

		sections.push({
		    name : 'Friends',
		    type : 'toggle',
		    pages : [{
		        name : 'AngusMclean',
		        type : 'link',
		        state : 'mentions.AngusMclean',
		        sref : 'mentions({mentionname:"AngusMclean"})',
		        selected : 'AngusMclean',
		        icon : 'fa fa-group'
		    },{
		        name : 'NikoDraca',
		        type : 'link',
		        state : 'mentions.NikoDraca',
		        sref : 'mentions({mentionname:"NikoDraca"})',
		        selected : 'NikoDraca',
		        icon : 'fa fa-group'
		    },{
		        name : 'Victor',
		        type : 'link',
		        state : 'mentions.Victor',
		        sref : 'mentions({mentionname:"Victor"})',
		        selected : 'Victor',
		        icon : 'fa fa-group'
		    },{
		        name : 'RichardWu',
		        type : 'link',
		        state : 'mentions.RichardWu',
		        sref : 'mentions({mentionname:"RichardWu"})',
		        selected : 'RichardWu',
		        icon : 'fa fa-group'
		    }]
		});

        sections.push({
		    name : 'Tags',
		    type : 'toggle',
		    pages : [{
		        name : 'mcHacks2016',
		        type : 'link',
		        state : 'tag.mcHacks2016',
		        sref : 'tag({tagname:"mcHacks2016"})',
		        selected : 'mcHacks2016',
		        icon : 'fa fa-group'
		    },{
		        name : 'mcgill',
		        type : 'link',
		        state : 'tag.mcgill',
		        sref : 'tag({tagname:"mcgill"})',
		        selected : 'mcgill',
		        icon : 'fa fa-group'
		    },{
		        name : 'montreal',
		        type : 'link',
		        state : 'tag.montreal',
		        sref : 'tag({tagname:"montreal"})',
		        selected : 'montreal',
		        icon : 'fa fa-group'
		    },{
		        name : 'hackathon',
		        type : 'link',
		        state : 'tag.hackathon',
		        sref : 'tag({tagname:"hackathon"})',
		        selected : 'hackathon',
		        icon : 'fa fa-group'
		    },{
		        name : 'projects',
		        type : 'link',
		        state : 'tag.projects',
		        sref : 'tag({tagname:"projects"})',
		        selected : 'projects',
		        icon : 'fa fa-group'
		    }]
		});
		
        sections.push({
		    name : 'Sign out',
		    type : 'link',
		    state : 'signin',
		    icon : 'fa fa-group'
		});


        var self;

        return self = {
          sections: sections,

          toggleSelectSection: function (section) {
            self.openedSection = (self.openedSection === section ? null : section);
          },
          isSectionSelected: function (section) {
            return self.openedSection === section;
          },

          selectPage: function (section, page) {
              console.log('selectPage')
            page && page.url && $location.path(page.url);
            self.currentSection = section;
            self.currentPage = page;
          }
        };

        function sortByHumanName(a, b) {
          return (a.humanName < b.humanName) ? -1 :
            (a.humanName > b.humanName) ? 1 : 0;
        }

      }])
      
})();