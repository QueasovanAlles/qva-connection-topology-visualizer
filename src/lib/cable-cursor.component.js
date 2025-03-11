"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CableCursorComponent = void 0;
const core_1 = require("@angular/core");
const connection_service_1 = require("./connection.service");
let CableCursorComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-cable-cursor',
            template: `
    <div class="cable-cursor" [style.left.px]="x" [style.top.px]="y">
      <app-audio-jack-hole [id]="cursorJackId" [inout]="connection.inout">
      </app-audio-jack-hole>
	  <div class="overlay-button" (click)="onClick($event)"></div>
    </div>
  `,
            styles: [`
    .cable-cursor {
      position: fixed;
      width: 20px;
      height: 20px;
      transform: translate(-50%, -50%);
      z-index: 9999;
    }
    .overlay-button {
		position: absolute;
		left:0px; width:100%;height:100%;top:0px;
	}
  `]
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _connection_decorators;
    let _connection_initializers = [];
    let _connection_extraInitializers = [];
    var CableCursorComponent = _classThis = class {
        constructor(connectionService, elementRef) {
            this.connectionService = connectionService;
            this.elementRef = elementRef;
            this.connection = __runInitializers(this, _connection_initializers, void 0);
            this.x = (__runInitializers(this, _connection_extraInitializers), 0);
            this.y = 0;
            this.cursorJackId = 'cursor-jack-' + Date.now();
            window.addEventListener('mousemove', (e) => {
                this.x = e.clientX;
                this.y = e.clientY;
            });
        }
        ngAfterViewInit() {
            setTimeout(() => {
                if (this.connection.inout === connection_service_1.InOut.INPUT) {
                    this.connectionService.setConnection(this.connection.from.length === 0 ? this.connection.to : this.connection.from, this.cursorJackId, this.connection.inout);
                }
                else {
                    this.connectionService.setConnection(this.connection.from.length === 0 ? this.connection.to : this.connection.from, this.cursorJackId, this.connection.inout);
                }
            }, 10);
        }
        getOppositeInout(inout) {
            return inout === connection_service_1.InOut.INPUT ? connection_service_1.InOut.OUTPUT : connection_service_1.InOut.INPUT;
        }
        onClick(event) {
            event.stopPropagation();
            event.preventDefault();
            this.connectionService.handleCursorClick({
                x: event.clientX,
                y: event.clientY,
                connection: this.connection
            });
        }
    };
    __setFunctionName(_classThis, "CableCursorComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _connection_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _connection_decorators, { kind: "field", name: "connection", static: false, private: false, access: { has: obj => "connection" in obj, get: obj => obj.connection, set: (obj, value) => { obj.connection = value; } }, metadata: _metadata }, _connection_initializers, _connection_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CableCursorComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CableCursorComponent = _classThis;
})();
exports.CableCursorComponent = CableCursorComponent;
