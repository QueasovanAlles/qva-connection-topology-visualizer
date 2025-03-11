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
exports.AudioJackHoleComponent = void 0;
// src/qva-connection-topology-visualizer/src/audio-jack-hole/audio-jack-hole.component.ts
const core_1 = require("@angular/core");
const connection_service_1 = require("../connection.service");
let AudioJackHoleComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-audio-jack-hole',
            templateUrl: './audio-jack-hole.component.html',
            styleUrls: ['./audio-jack-hole.component.scss'],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _inout_decorators;
    let _inout_initializers = [];
    let _inout_extraInitializers = [];
    var AudioJackHoleComponent = _classThis = class {
        constructor(elementRef, connectionService, positionUpdateService) {
            this.elementRef = elementRef;
            this.connectionService = connectionService;
            this.positionUpdateService = positionUpdateService;
            this.id = __runInitializers(this, _id_initializers, this.generateId());
            this.inout = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _inout_initializers, connection_service_1.InOut.OUTPUT));
            this.position = (__runInitializers(this, _inout_extraInitializers), {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            });
            this.isVisible = false;
            this.observer = null;
            this.pollingSubscription = null;
        }
        generateId() {
            return Date.now().toString(36) + Math.random().toString(36).substring(2);
        }
        ngAfterViewInit() {
            // Subscribe to polling state changes
            this.pollingSubscription = this.positionUpdateService.isPollingEnabled$.subscribe((enabled) => {
                if (enabled) {
                    // Start polling if enabled
                    if (!this.intervalId) {
                        this.intervalId = setInterval(() => this.updatePosition(), 100);
                    }
                }
                else {
                    // Stop polling if disabled
                    if (this.intervalId) {
                        clearInterval(this.intervalId);
                        this.intervalId = null;
                    }
                }
            });
            // Calculate initial position
            this.updatePosition();
            // Set up IntersectionObserver to detect visibility
            this.setupIntersectionObserver();
            setTimeout(() => {
                if (!this.id)
                    throw new Error('AudioJackHoleComponent requires a unique ID');
            }, 500);
        }
        ngOnDestroy() {
            if (this.intervalId) {
                clearInterval(this.intervalId);
            }
            if (this.observer) {
                this.observer.disconnect();
            }
            if (this.pollingSubscription) {
                this.pollingSubscription.unsubscribe();
            }
        }
        updatePosition() {
            const rect = this.elementRef.nativeElement.getBoundingClientRect();
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const newPosition = {
                x: rect.left + scrollLeft + 2,
                y: rect.top + scrollTop + 2,
                width: rect.width,
                height: rect.height,
            };
            if (newPosition.x !== this.position.x ||
                newPosition.y !== this.position.y ||
                newPosition.width !== this.position.width ||
                newPosition.height !== this.position.height) {
                this.position = newPosition;
                this.connectionService.registerOrUpdateJackHole(this.id, this.position, this.inout);
            }
        }
        setupIntersectionObserver() {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    this.isVisible = entry.isIntersecting;
                });
            }, { root: null, rootMargin: '0px', threshold: 0.1 });
            this.observer.observe(this.elementRef.nativeElement);
        }
        cableChange() {
            this.connectionService.cableChange(this.id, this.inout, this.elementRef.nativeElement.getBoundingClientRect().left, this.elementRef.nativeElement.getBoundingClientRect().top);
        }
    };
    __setFunctionName(_classThis, "AudioJackHoleComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, core_1.Input)()];
        _inout_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _inout_decorators, { kind: "field", name: "inout", static: false, private: false, access: { has: obj => "inout" in obj, get: obj => obj.inout, set: (obj, value) => { obj.inout = value; } }, metadata: _metadata }, _inout_initializers, _inout_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AudioJackHoleComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AudioJackHoleComponent = _classThis;
})();
exports.AudioJackHoleComponent = AudioJackHoleComponent;
