/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Happy Territory
//By Eric Yi 
//The initial code of drawing hexagon is built with a tutorial written by Pedro's Tech Mumbling


        var xOffset = 100;
        var yOffset = 50;

        var previousPointX;
        var previousPointY;

        var down = false;
        var hex;
        
 

        window.onload = function () {

            canvas = document.getElementById("myCanvas");
            
            hex = new hexDefinition(45);

            render();

            canvas.onmousedown = function (e) {
                var x;
                var y;
                
                console.log(e.pageX);
                console.log(e.pageY);
                

                down = true;
                findTile(e);

//                console.log('mouse down');

                if (e.pageX || e.pageY) {
                    x = e.pageX;
                    y = e.pageY;
                }
                else {
                    x = e.clientX + document.body.scrollLeft 
                                  + document.documentElement.scrollLeft;
                    y = e.clientY + document.body.scrollTop 
                                  + document.documentElement.scrollTop;
                }
                x -= canvas.offsetLeft;
                y -= canvas.offsetTop;

                previousPointX = x;
                previousPointY = y;
            };

            canvas.onmouseup = function (e) {

                down = false;

                console.log('mouse up');
            };

            canvas.onmousemove = function (e) {

                if (down == false) {
                    return;
                } 
                
                var x;
                var y;

                if (e.pageX || e.pageY) {
                    x = e.pageX;
                    y = e.pageY;
                }
                else {
                    x = e.clientX + document.body.scrollLeft 
                                  + document.documentElement.scrollLeft;
                    y = e.clientY + document.body.scrollTop
                                  + document.documentElement.scrollTop;
                          
                }
                x -= canvas.offsetLeft;
                y -= canvas.offsetTop;
                xOffset += (x - previousPointX);
                yOffset += (y - previousPointY);

                previousPointX = x;
                previousPointY = y;

                render();

            };
        };
        
        function findTile(e){
            
            var center0 =  hex.getHexagonalCoordinates(e.pageX,e.pageY);
            console.log(center0.u);
            console.log(center0.v);
//            
        };
        
        function drawHex(context, hexCoordinates) {

            var center = hex.getWorldCoordinates(hexCoordinates.u, hexCoordinates.v);

            context.moveTo((center.x - hex.b / 2.0) + xOffset, 
                           center.y + yOffset );
            context.lineTo((center.x - hex.s / 2.0) + xOffset, 
                          (center.y - hex.a / 2.0) + yOffset);
            context.lineTo((center.x + hex.s / 2.0) + xOffset, 
                          (center.y - hex.a / 2.0) + yOffset);
            context.lineTo((center.x + hex.b / 2.0) + xOffset, 
                           center.y + yOffset);
            context.lineTo((center.x + hex.s / 2.0) + xOffset, 
                          (center.y + hex.a / 2.0) + yOffset);
            context.lineTo((center.x - hex.s / 2.0) + xOffset, 
                          (center.y + hex.a / 2.0)  + yOffset);
            context.lineTo((center.x - hex.b / 2.0) + xOffset,
                           center.y + yOffset);
            context.lineWidth = 2;
            context.strokeStyle = "#444";
     context.fillStyle = "#444";
     context.textAlign = "center";
     context.textBaseline = "middle";
     context.fillText("(" + hexCoordinates.u + "," + hexCoordinates.v + ")", 
                             center.x + xOffset, center.y + yOffset );
        }

        function render() {

            var canvas = document.getElementById("myCanvas");
            var context = canvas.getContext("2d");

            context.clearRect(0, 0, 800, 600);
            drawHexagonGrid(context);
        }

        function drawHexagonGrid(context) {

            context.beginPath();
            for (var i = -5; i < 5; i++) {
                for (var j = -5; j < 5; j++) {
                    drawHex(context, new hexCoordinates(i, j));
                }
            }
            context.stroke();            
        }

        function hexDefinition(edgeSize) {

            this.s = edgeSize;

            this.h = Math.sin(30*Math.PI/180) * edgeSize;

            this.r = Math.cos(30*Math.PI/180) * edgeSize;

            this.b = edgeSize + 2 * this.h;

            this.a = 2 * this.r;

            this.hexagon_narrow_width  = this.s + this.h;
            this.hexagon_wide_width = this.b;
            this.hexagon_height = this.a;

            /*
             u - horizontal index of hex
             v - vertical index of hex
             */
            this.getWorldCoordinates = function(u, v) {

                var x = this.hexagon_narrow_width * u;
                var y = this.hexagon_height * (u*0.5 + v);

                return new worldCoordinates(x,y);
            };

            this.getHexagonalCoordinates = function(x, y) {

                var u = x / this.hexagon_narrow_width;
                var v = y / this.hexagon_height - u * 0.5;

                return new hexCoordinates(u, v);
            };
        }

        function worldCoordinates(x, y) {
            this.x = x;
            this.y = y;
        }

        function hexCoordinates(u, v) {
            this.u = u;
            this.v = v;
        }

