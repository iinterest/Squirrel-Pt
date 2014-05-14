/*!
 * Squirrel project template Gruntfile
 * http://hisquirrel.com
 * Copyright 2013-2014
 * Licensed under MIT (https://github.com/iinterest/Squirrel-3/blob/master/LICENSE.md)
 */
module.exports = function (grunt) {
    "use strict";
    var logo = '---------------------------------------------------------- \n' + 
            'Squirel PT Running \n' + 
            '---------------------------------------------------------- \n';
    console.log(logo);
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        banner: '/*!\n' +
            ' * <%= pkg.name %> \n' +
            ' * @version: <%= pkg.version %>\n' +
            ' * @date: <%= grunt.template.today("yyyy-mm-dd hh:MM:ss") %>\n' +
            ' */\n',
        concat: {
            concatJS: {
                src: [
                    "src/js/*.js"
                ],
                dest: "build/js/<%= pkg.name%>.js"
            }
        },
        uglify: {
            options: {
                banner: "<%= banner %>"
            },
            build: {
                src: "build/js/<%= pkg.name%>.js",
                dest: "dist/js/<%= pkg.name%>-min.js"
            }
        },
        less: {
            compileCore: {
                files: {
                    "build/css/<%= pkg.name %>.css": "src/less/main.less"
                }
            }
        },
        cssmin: {
            compress: {
                options: {
                    banner: "<%= banner %>"
                },
                src: [
                    "build/css/<%= pkg.name%>.css"
                ],
                dest: "dist/css/<%= pkg.name%>-min.css"
            }
        },
        clean: {
            options: {force: true},
            build: "build",
            dist: [
                "dist/css/<%= pkg.name%>-min.css",
                "dist/js/<%= pkg.name%>-min.js"
            ]
        },
        watch: {
            less: {
                files: "src/less/*.less",
                tasks: ["less", "cssmin"]
            },
            script: {
                files: [
                    "src/js/*.js",
                    "src/js/core/*.js"
                ],
                tasks: ["concat:concatJS", "uglify"]
            }
        }
    });
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    // 构建工程
    grunt.registerTask("build", ["clean", "concat", "less", "uglify", "cssmin"]);

    // 监视文件变化自动构建
    // grunt watch

    // 清空已购建工程
    // grunt clean
};