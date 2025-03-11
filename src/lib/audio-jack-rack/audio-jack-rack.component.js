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
exports.AudioJackRackComponent = void 0;
const core_1 = require("@angular/core");
const animations_1 = require("@angular/animations");
let AudioJackRackComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-audio-jack-rack',
            templateUrl: './audio-jack-rack.component.html',
            styleUrls: ['./audio-jack-rack.component.scss'],
            animations: [
                (0, animations_1.trigger)('plugState', [
                    (0, animations_1.state)('void', (0, animations_1.style)({
                        opacity: 0.6,
                        transform: 'scale(1)'
                    })),
                    (0, animations_1.state)('*', (0, animations_1.style)({
                        opacity: 1,
                        transform: 'scale(1)'
                    })),
                    (0, animations_1.transition)('void => *', (0, animations_1.animate)('1000ms ease-out'))
                ])
            ]
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _connections_decorators;
    let _connections_initializers = [];
    let _connections_extraInitializers = [];
    let _clientId_decorators;
    let _clientId_initializers = [];
    let _clientId_extraInitializers = [];
    var AudioJackRackComponent = _classThis = class {
        getRackJackId(peerId) {
            return `rack_${this.clientId}_${peerId}`;
        }
        constructor(cdr) {
            this.cdr = cdr;
            this.connections = __runInitializers(this, _connections_initializers, []);
            this.clientId = (__runInitializers(this, _connections_extraInitializers), __runInitializers(this, _clientId_initializers, ''));
            __runInitializers(this, _clientId_extraInitializers);
            this.cdr = cdr;
        }
        ngAfterViewInit() {
        }
        onJackHoleLoaded(element) {
        }
    };
    __setFunctionName(_classThis, "AudioJackRackComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _connections_decorators = [(0, core_1.Input)()];
        _clientId_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _connections_decorators, { kind: "field", name: "connections", static: false, private: false, access: { has: obj => "connections" in obj, get: obj => obj.connections, set: (obj, value) => { obj.connections = value; } }, metadata: _metadata }, _connections_initializers, _connections_extraInitializers);
        __esDecorate(null, null, _clientId_decorators, { kind: "field", name: "clientId", static: false, private: false, access: { has: obj => "clientId" in obj, get: obj => obj.clientId, set: (obj, value) => { obj.clientId = value; } }, metadata: _metadata }, _clientId_initializers, _clientId_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AudioJackRackComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AudioJackRackComponent = _classThis;
})();
exports.AudioJackRackComponent = AudioJackRackComponent;
