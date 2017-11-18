"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("./httpDecorator");
var Test = (function () {
    function Test() {
    }
    Test.prototype.greet = function (params, err, result) {
        console.log('params: ', params);
        if (err instanceof Error)
            throw err;
        console.log('result: ', result);
    };
    __decorate([
        http({ url: 'https://mock.codes/500' })
    ], Test.prototype, "greet", null);
    return Test;
}());
var t = new Test;
t.greet();
