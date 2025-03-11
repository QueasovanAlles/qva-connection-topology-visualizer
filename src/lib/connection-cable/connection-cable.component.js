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
exports.ConnectionCableComponent = void 0;
const core_1 = require("@angular/core");
const animations_1 = require("@angular/animations");
let ConnectionCableComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-connection-cable',
            templateUrl: './connection-cable.component.html',
            styleUrls: ['./connection-cable.component.scss'],
            animations: [
                (0, animations_1.trigger)('drawPath', [
                    (0, animations_1.transition)(':enter', [
                        (0, animations_1.style)({ strokeDashoffset: '100%' }),
                        (0, animations_1.animate)('1000ms ease-out', (0, animations_1.style)({ strokeDashoffset: '0%' }))
                    ])
                ]),
                (0, animations_1.trigger)('plugAnimation', [
                    (0, animations_1.transition)(':enter', [
                        (0, animations_1.style)({ transform: 'scale(0)' }),
                        (0, animations_1.animate)('300ms ease-out', (0, animations_1.style)({ transform: 'scale(1)' }))
                    ])
                ])
            ]
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _startPoint_decorators;
    let _startPoint_initializers = [];
    let _startPoint_extraInitializers = [];
    let _endPoint_decorators;
    let _endPoint_initializers = [];
    let _endPoint_extraInitializers = [];
    let _cableColor_decorators;
    let _cableColor_initializers = [];
    let _cableColor_extraInitializers = [];
    let _tension_decorators;
    let _tension_initializers = [];
    let _tension_extraInitializers = [];
    var ConnectionCableComponent = _classThis = class {
        get pathData() {
            const dx = this.endPoint.x - this.startPoint.x;
            const dy = this.endPoint.y - this.startPoint.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            // Control points for the curve
            const midX = (this.startPoint.x + this.endPoint.x) / 2;
            const midY = (this.startPoint.y + this.endPoint.y) / 2;
            // Calculate sag based on tension
            const sag = distance * (1 - this.tension) * 0.5;
            // Create a natural-looking curve with controlled sag
            const cp1x = midX - dx * 0.25;
            const cp1y = midY + sag;
            const cp2x = midX + dx * 0.25;
            const cp2y = midY + sag;
            return `M ${this.startPoint.x},${this.startPoint.y} 
            C ${cp1x},${cp1y} 
              ${cp2x},${cp2y} 
              ${this.endPoint.x},${this.endPoint.y}`;
        }
        constructor() {
            this.startPoint = __runInitializers(this, _startPoint_initializers, { x: 0, y: 0 });
            this.endPoint = (__runInitializers(this, _startPoint_extraInitializers), __runInitializers(this, _endPoint_initializers, { x: 0, y: 0 }));
            this.cableColor = (__runInitializers(this, _endPoint_extraInitializers), __runInitializers(this, _cableColor_initializers, '#4B0082'));
            this.tension = (__runInitializers(this, _cableColor_extraInitializers), __runInitializers(this, _tension_initializers, 0.5)); // Controls cable sag (0-1)
            __runInitializers(this, _tension_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "ConnectionCableComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _startPoint_decorators = [(0, core_1.Input)()];
        _endPoint_decorators = [(0, core_1.Input)()];
        _cableColor_decorators = [(0, core_1.Input)()];
        _tension_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _startPoint_decorators, { kind: "field", name: "startPoint", static: false, private: false, access: { has: obj => "startPoint" in obj, get: obj => obj.startPoint, set: (obj, value) => { obj.startPoint = value; } }, metadata: _metadata }, _startPoint_initializers, _startPoint_extraInitializers);
        __esDecorate(null, null, _endPoint_decorators, { kind: "field", name: "endPoint", static: false, private: false, access: { has: obj => "endPoint" in obj, get: obj => obj.endPoint, set: (obj, value) => { obj.endPoint = value; } }, metadata: _metadata }, _endPoint_initializers, _endPoint_extraInitializers);
        __esDecorate(null, null, _cableColor_decorators, { kind: "field", name: "cableColor", static: false, private: false, access: { has: obj => "cableColor" in obj, get: obj => obj.cableColor, set: (obj, value) => { obj.cableColor = value; } }, metadata: _metadata }, _cableColor_initializers, _cableColor_extraInitializers);
        __esDecorate(null, null, _tension_decorators, { kind: "field", name: "tension", static: false, private: false, access: { has: obj => "tension" in obj, get: obj => obj.tension, set: (obj, value) => { obj.tension = value; } }, metadata: _metadata }, _tension_initializers, _tension_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ConnectionCableComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ConnectionCableComponent = _classThis;
})();
exports.ConnectionCableComponent = ConnectionCableComponent;
