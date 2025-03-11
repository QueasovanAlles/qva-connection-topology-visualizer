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
exports.ConnectionService = exports.InOut = void 0;
const core_1 = require("@angular/core");
var InOut;
(function (InOut) {
    InOut["INPUT"] = "input";
    InOut["OUTPUT"] = "output";
})(InOut || (exports.InOut = InOut = {}));
let ConnectionService = (() => {
    let _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ConnectionService = _classThis = class {
        constructor() {
            this.jackHoles = []; // Registry of jack holes
            this.connections = []; // List of connections
            this.cables = [];
            this.cabling = false;
            this.cablingChange = new core_1.EventEmitter();
            this.cablesChanged = new core_1.EventEmitter();
        }
        demoRandomConnect() {
            // Get available jacks (not yet connected)
            const getAvailableJacks = (jacks) => jacks.filter(jack => !this.connections.some(conn => conn.from === jack.id || conn.to === jack.id));
            let availableOutputs = getAvailableJacks(this.jackHoles.filter(jack => jack.inout === InOut.OUTPUT));
            let availableInputs = getAvailableJacks(this.jackHoles.filter(jack => jack.inout === InOut.INPUT));
            // Calculate possible connections based on available jacks
            const maxConnections = Math.min(3 + Math.floor(Math.random() * 3), Math.min(availableOutputs.length, availableInputs.length));
            for (let i = 0; i < maxConnections; i++) {
                const randomOutputIndex = Math.floor(Math.random() * availableOutputs.length);
                const randomInputIndex = Math.floor(Math.random() * availableInputs.length);
                const randomOutput = availableOutputs[randomOutputIndex];
                const randomInput = availableInputs[randomInputIndex];
                if (randomOutput && randomInput) {
                    this.addConnection(randomOutput.id, InOut.OUTPUT);
                    this.setConnection(randomOutput.id, randomInput.id, InOut.INPUT);
                    // Remove used jacks from available pools
                    availableOutputs = availableOutputs.filter(jack => jack.id !== randomOutput.id);
                    availableInputs = availableInputs.filter(jack => jack.id !== randomInput.id);
                }
            }
        }
        removeJackHole(id) {
            this.jackHoles = this.jackHoles.filter(jh => jh.id !== id);
            this.removeConnection(id);
            this.drawCables();
        }
        // Register or update a jack hole's position
        registerOrUpdateJackHole(id, position, inout) {
            const existing = this.jackHoles.find((jh) => jh.id === id);
            if (existing) {
                existing.position = position;
            }
            else {
                this.jackHoles.push({ id, position, inout });
            }
            console.log('Registered/Updated jack holes:', this.jackHoles);
            this.drawCables(); // Redraw cables whenever a position updates
        }
        addConnection(anId, inout) {
            const connection = {
                from: inout === InOut.INPUT ? anId : '',
                to: inout === InOut.OUTPUT ? anId : '',
                inout: this.getOppositeInout(inout) // meaning is : what we search
            };
            this.connections.push(connection);
            this.drawCables();
            return connection;
        }
        setConnection(connectedId, connectWithId, inout) {
            const connection = this.connections.find(conn => conn.from === connectedId || conn.to === connectedId);
            if (connection && connection.inout === inout) {
                if (connection.inout === InOut.INPUT) {
                    connection.from = connectWithId;
                }
                else {
                    connection.to = connectWithId;
                }
                this.drawCables();
                return true;
            }
            return false;
        }
        removeConnection(anId) {
            this.connections = this.connections.filter(conn => conn.from !== anId && conn.to !== anId);
            this.drawCables();
        }
        cleanupUnConnected() {
            this.connections = this.connections.filter(conn => conn.from !== '' && conn.to !== '');
            this.drawCables();
        }
        cableChange(holeId, inout, left, top) {
            const existingConnection = this.connections.find(conn => conn.from === holeId || conn.to === holeId);
            let cablingConnection;
            if (!existingConnection) {
                // Start new connection
                const newConnection = this.addConnection(holeId, inout);
                this.cabling = true;
                cablingConnection = newConnection;
            }
            else {
                // Modify existing connection
                if (existingConnection.from === holeId) {
                    existingConnection.to = '';
                }
                else {
                    existingConnection.from = '';
                }
                this.cabling = true;
                cablingConnection = existingConnection;
            }
            if (cablingConnection) {
                this.drawCables();
                cablingConnection.x = left;
                cablingConnection.y = top;
                this.cablingChange.emit(cablingConnection);
                this.drawCables();
            }
        }
        handleCursorClick(data) {
            if (data.connection.inout === InOut.OUTPUT)
                this.removeJackHole(data.connection.to);
            else
                this.removeJackHole(data.connection.from);
            const nearestJack = this.findNearestCompatibleJack(data.x, data.y, data.connection.inout);
            if (data.connection.from.substr(0, 6) === 'cursor') {
                this.removeConnection(data.connection.to);
                if (nearestJack && this.isWithinRange(nearestJack, data.x, data.y)) {
                    this.addConnection(data.connection.to, data.connection.inout);
                    this.setConnection(data.connection.to, nearestJack.id, this.getOppositeInout(data.connection.inout));
                }
            }
            else {
                this.removeConnection(data.connection.from);
                if (nearestJack && this.isWithinRange(nearestJack, data.x, data.y)) {
                    this.addConnection(data.connection.from, data.connection.inout);
                    this.setConnection(data.connection.from, nearestJack.id, this.getOppositeInout(data.connection.inout));
                }
            }
            this.cleanupUnConnected();
            this.cabling = false;
            this.cablingChange.emit(null);
            this.drawCables();
        }
        findNearestCompatibleJack(x, y, inout) {
            var _a;
            return ((_a = this.jackHoles
                .filter(jack => jack.inout === inout)
                .reduce((nearest, jack) => {
                const distance = this.getDistance(x, y, jack.position);
                return (!nearest || distance < nearest.distance)
                    ? { jack, distance }
                    : nearest;
            }, null)) === null || _a === void 0 ? void 0 : _a.jack) || null;
        }
        getDistance(x, y, position) {
            const dx = x - position.x;
            const dy = y - position.y;
            return Math.sqrt(dx * dx + dy * dy);
        }
        isWithinRange(jack, x, y) {
            return this.getDistance(x, y, jack.position) < 50;
        }
        getOppositeInout(inout) {
            return inout === InOut.INPUT ? InOut.OUTPUT : InOut.INPUT;
        }
        getRandomDarkColor() {
            const hue = Math.floor(Math.random() * 360);
            const saturation = 60 + Math.random() * 20; // 60-80%
            const lightness = 20 + Math.random() * 15; // 20-35%
            return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        }
        drawCables() {
            let newCables = [];
            this.connections.forEach((connection) => {
                const fromJack = this.jackHoles.find((jh) => jh.id === connection.from);
                const toJack = this.jackHoles.find((jh) => jh.id === connection.to);
                if (fromJack && toJack) {
                    newCables.push({
                        startPoint: fromJack.position,
                        endPoint: toJack.position,
                        color: this.getRandomDarkColor()
                    });
                }
            });
            this.cables = newCables;
            // Emit the updated cables array
            this.cablesChanged.emit(this.cables);
        }
    };
    __setFunctionName(_classThis, "ConnectionService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ConnectionService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ConnectionService = _classThis;
})();
exports.ConnectionService = ConnectionService;
