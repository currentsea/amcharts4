var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container } from "./Container";
import { List, ListDisposer } from "./utils/List";
import { OrderedListTemplate } from "./utils/SortedList";
import { Dictionary } from "./utils/Dictionary";
import { Export } from "./export/Export";
import { DataSource } from "./data/DataSource";
import { Responsive } from "./responsive/Responsive";
import { DataItem } from "./DataItem";
import { system } from "./System";
import * as $math from "./utils/Math";
import * as $array from "./utils/Array";
import * as $ease from "./utils/Ease";
import * as $utils from "./utils/Utils";
import * as $iter from "./utils/Iterator";
import * as $object from "./utils/Object";
import * as $type from "./utils/Type";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A Component represents an independent functional element or control, that
 * can have it's own behavior, children, data, etc.
 *
 * A few examples of a Component: [[Legend]], [[Series]], [[Scrollbar]].
 *
 * @see {@link IComponentEvents} for a list of available events
 * @see {@link IComponentAdapters} for a list of available Adapters
 * @important
 */
var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    /**
     * Constructor
     */
    function Component() {
        var _this = 
        // Init
        _super.call(this) || this;
        /**
         * Holds data field names.
         *
         * Data fields define connection beween [[DataItem]] and actual properties
         * in raw data.\z
         *
         * @type {IComponentDataFields}
         */
        _this.dataFields = {};
        /**
         * A list of [[DataSource]] definitions of external data source.
         *
         * @ignore Exclude from docs
         * @type {Object}
         */
        _this._dataSources = {};
        /**
         * This is used when only new data is invalidated (if added using `addData`
         * method).
         *
         * @ignore Exclude from docs
         * @type {number}
         */
        _this._parseDataFrom = 0;
        /**
         *
         * @ignore Exclude from docs
         * @todo Description
         * @type {List<Component>}
         */
        _this._dataUsers = new List();
        /**
         * [_start description]
         *
         * @ignore Exclude from docs
         * @type {number}
         */
        _this._start = 0;
        /**
         * [_end description]
         *
         * @ignore Exclude from docs
         * @type {number}
         */
        _this._end = 1;
        /**
         * [_maxZoomFactor description]
         *
         * @ignore Exclude from docs
         * @type {number}
         */
        _this._maxZoomFactor = Infinity;
        /**
         * If set to `true`, changing data range in element will not trigger
         * `daterangechanged` event.
         *
         * @type {boolean}
         */
        _this.skipRangeEvent = false;
        /**
         * Duration (ms) to animate between different range selections.
         * @type {number}
         */
        _this.rangeChangeDuration = 0;
        /**
         * An easing function to use for range change animation.
         *
         * @see {@link Ease}
         * @type {function}
         */
        _this.rangeChangeEasing = $ease.cubicOut;
        /**
         * A duration (ms) of each data parsing step. A Component parses its data in
         * chunks in order to avoid completely freezing the machine when large data
         * sets are used. This setting will control how many milliseconds should pass
         * when parsing data until parser stops for a brief moment to let other
         * processes catch up.
         *
         * @type {number}
         */
        _this.parsingStepDuration = 100;
        /**
         * [dataInvalid description]
         *
         * @ignore Exclude from docs
         * @todo Description
         * @type {boolean}
         */
        _this.dataInvalid = false;
        /**
         * [rawDataInvalid description]
         *
         * @ignore Exclude from docs
         * @todo Description
         * @type {boolean}
         */
        _this.rawDataInvalid = false;
        /**
         * [dataRangeInvalid description]
         *
         * @ignore Exclude from docs
         * @todo Description
         * @type {boolean}
         */
        _this.dataRangeInvalid = false;
        /**
         * [dataItemsInvalid description]
         *
         * @ignore Exclude from docs
         * @todo Description
         * @type {boolean}
         */
        _this.dataItemsInvalid = false;
        /**
         * Duration (ms) the interpolation (morphing) animation should take when
         * transiting from one value into another.
         *
         * @type {number}
         */
        _this.interpolationDuration = 0;
        /**
         * An easing function to use for the interpolation (morphing) animation for
         * transition between two values.
         *
         * @see {@link Ease}
         * @type {function}
         */
        _this.interpolationEasing = $ease.cubicOut;
        /**
         * Should interpolation animations for each element's data item play
         * consequently?
         *
         * @type {boolean}
         */
        _this.sequencedInterpolation = true;
        /**
         * A delay (ms) to wait between animating each subsequent data item's
         * interpolation animation.
         *
         * @type {number}
         */
        _this.sequencedInterpolationDelay = 0;
        /**
         * A progress (0-1) for the data validation process.
         *
         * @ignore Exclude from docs
         * @type {number}
         */
        _this.dataValidationProgress = 0;
        _this.className = "Component";
        _this.invalidateData();
        // Set up events
        _this.events.on("maxsizechanged", _this.invalidate, _this);
        // TODO what about remove ?
        _this.dataUsers.events.on("insert", _this.handleDataUserAdded, _this);
        // Set up disposers
        _this._disposers.push(new ListDisposer(_this.dataItems));
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return {DataItem} Data Item
     */
    Component.prototype.createDataItem = function () {
        return new DataItem();
    };
    /**
     * [handleDataUserAdded description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param {IListEvents<Component>["insert"]} event Event object
     */
    Component.prototype.handleDataUserAdded = function (event) {
        var dataUser = event.newValue;
        dataUser.dataProvider = this;
    };
    /**
     * [handleDataItemValueChange description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    Component.prototype.handleDataItemValueChange = function () {
        this.invalidateDataItems();
    };
    /**
     * [handleDataItemWorkingValueChange description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    Component.prototype.handleDataItemWorkingValueChange = function () {
    };
    /**
     * [handleDataItemCalculatedValueChange description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    Component.prototype.handleDataItemCalculatedValueChange = function () {
    };
    /**
     * [handleDataItemPropertyChange description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    Component.prototype.handleDataItemPropertyChange = function () {
    };
    /**
     * Populates a [[DataItem]] width data from data source.
     *
     * Loops through all the fields and if such a field is found in raw data
     * object, a corresponding value on passed in `dataItem` is set.
     *
     * @ignore Exclude from docs
     * @param {Object} item
     */
    Component.prototype.processDataItem = function (dataItem, dataContext, index) {
        var _this = this;
        if (dataItem) {
            if (!dataContext) {
                dataContext = {};
            }
            // store reference to original data item
            dataItem.dataContext = dataContext;
            $object.each(this.dataFields, function (fieldName, fieldValue) {
                var value = dataContext[fieldValue];
                // Apply adapters to a retrieved value
                value = _this.adapter.apply("dataContextValue", {
                    field: fieldName,
                    value: value,
                    dataItem: dataItem
                }).value;
                if (dataItem.hasChildren[fieldName]) {
                    if (value) {
                        var children = new OrderedListTemplate(_this.createDataItem());
                        children.events.on("insert", _this.handleDataItemAdded, _this);
                        children.events.on("remove", _this.invalidateDataItems, _this);
                        for (var i = 0; i < value.length; i++) {
                            var rawDataItem = value[i];
                            var childDataItem = children.create();
                            childDataItem.parent = dataItem;
                            _this.processDataItem(childDataItem, rawDataItem, i);
                        }
                        dataItem[fieldName] = children;
                    }
                }
                else {
                    // data is converted to numbers/dates in each dataItem
                    if ($type.hasValue(value)) {
                        dataItem[fieldName] = value;
                    }
                }
            });
            // todo: use some iterator
            $object.each(this.propertyFields, function (f, fieldValue) {
                var value = dataContext[fieldValue];
                if ($type.hasValue(value)) {
                    dataItem.setProperty(f, value);
                }
            });
            // TODO dispose of these at some point ?
            dataItem.events.on("valuechanged", this.handleDataItemValueChange, this);
            dataItem.events.on("workingvaluechanged", this.handleDataItemWorkingValueChange, this);
            dataItem.events.on("calculatedvaluechanged", this.handleDataItemCalculatedValueChange, this);
            dataItem.events.on("propertychanged", this.handleDataItemPropertyChange, this);
            dataItem.events.on("locationchanged", this.handleDataItemValueChange, this);
            dataItem.events.on("workinglocationchanged", this.handleDataItemWorkingValueChange, this);
        }
    };
    /**
     * [validateDataElements description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    Component.prototype.validateDataElements = function () {
        for (var i = this.startIndex; i < this.endIndex; i++) {
            this.validateDataElement(this.dataItems.getIndex(i));
        }
    };
    /**
     * Validates this element and its related elements.
     *
     * @ignore Exclude from docs
     */
    Component.prototype.validate = function () {
        this.validateDataElements();
        _super.prototype.validate.call(this);
    };
    /**
     * [validateDataElement description]
     *
     * @ignore Exclude from docs
     * @param {this["_dataItem"]} dataItem [description]
     */
    Component.prototype.validateDataElement = function (dataItem) {
    };
    /**
     * Adds one or several (arrat) of data items to the existing data.
     *
     * @param {Object | Object[]} rawDataItem One or many raw data item objects
     */
    Component.prototype.addData = function (rawDataItem) {
        this._parseDataFrom = this.data.length; // save length of parsed data
        if (rawDataItem instanceof Array) {
            this.data = this.data.concat(rawDataItem);
        }
        else {
            this.data.push(rawDataItem); // add to raw data array
        }
        this.invalidateData();
    };
    /**
     * Triggers a data (re)parsing.
     *
     * @ignore Exclude from docs
     */
    Component.prototype.invalidateData = function () {
        if (this.disabled || this.isTemplate) {
            return;
        }
        $array.move(system.invalidDatas, this);
        this.dataInvalid = true;
        $iter.each(this._dataUsers.iterator(), function (x) {
            x.invalidateDataItems();
        });
    };
    /**
     * [invalidateDataUsers description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    Component.prototype.invalidateDataUsers = function () {
        $iter.each(this._dataUsers.iterator(), function (x) {
            x.invalidate();
        });
    };
    /**
     * Invalidates data values. When data array is not changed, but values within
     * it changes, we invalidate data so that component would process changes.
     *
     * @ignore Exclude from docs
     */
    Component.prototype.invalidateDataItems = function () {
        if (this.disabled || this.isTemplate) {
            return;
        }
        $array.move(system.invalidDataItems, this);
        this.dataItemsInvalid = true;
        $iter.each(this._dataUsers.iterator(), function (x) {
            x.invalidateDataItems();
        });
    };
    /**
     * Invalidates data range. This is done when data which must be shown
     * changes (chart is zoomed for example).
     *
     * @ignore Exclude from docs
     */
    Component.prototype.invalidateDataRange = function () {
        if (this.disabled || this.isTemplate) {
            return;
        }
        this.dataRangeInvalid = true;
        $array.move(system.invalidDataRange, this);
    };
    /**
     * Processes data range.
     *
     * @todo Description
     * @ignore Exclude from docs
     */
    Component.prototype.validateDataRange = function () {
        $array.remove(system.invalidDataRange, this);
        this.dataRangeInvalid = false;
        if (this.startIndex != this._prevStartIndex || this.endIndex != this._prevEndIndex) {
            this.rangeChangeUpdate();
        }
        this.appendDataItems();
        this.invalidate();
        this.dispatchImmediately("datarangechanged");
    };
    /**
     * [sliceData description]
     *
     * @todo Description
     * @ignore Exclude from docs
     */
    Component.prototype.sliceData = function () {
        this._workingStartIndex = this.startIndex;
        this._workingEndIndex = this.endIndex;
    };
    /**
     * [rangeChangeUpdate description]
     *
     * @todo Description
     * @ignore Exclude from docs
     */
    Component.prototype.rangeChangeUpdate = function () {
        this.sliceData();
        this._prevStartIndex = this.startIndex;
        this._prevEndIndex = this.endIndex;
    };
    /**
     * [removeDataItems description]
     *
     * @todo Description
     * @ignore Exclude from docs
     */
    Component.prototype.removeDataItems = function () {
    };
    /**
     * [appendDataItems description]
     *
     * @todo Description
     * @ignore Exclude from docs
     */
    Component.prototype.appendDataItems = function () {
        // todo: think if we can optimize this place, maybe mark the ones which should not be removed and then remove all others?
        this.removeDataItems();
        // TODO use an iterator instead
        for (var i = this.startIndex; i < this.endIndex; i++) {
            // data item
            var dataItem = this.dataItems.getIndex(i);
            if (dataItem) {
                // append item
                this.appendDataItem(dataItem);
            }
        }
    };
    /**
     * [appendDataItem description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param {this["_dataItem"]} dataItem [description]
     */
    Component.prototype.appendDataItem = function (dataItem) {
        // todo: this makes default state to be applied a lot of times. Need to think of a diff solution
        // and we also need to find when we actually need this
        //dataItem.invalidate();
    };
    /**
     * [invalidateRawData description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    Component.prototype.invalidateRawData = function () {
        if (this.disabled || this.isTemplate) {
            return;
        }
        $array.move(system.invalidRawDatas, this);
        this.rawDataInvalid = true;
        $iter.each(this._dataUsers.iterator(), function (x) {
            x.invalidateRawData();
        });
    };
    Component.prototype.validateRawData = function () {
        var _this = this;
        $array.remove(system.invalidRawDatas, this);
        var i = 0;
        $iter.each(this.dataItems.iterator(), function (dataItem) {
            if (dataItem) {
                _this.processDataItem(dataItem, dataItem.dataContext, i);
                i++;
            }
        });
    };
    /**
     * Validates (processes) data.
     *
     * @ignore Exclude from docs
     */
    Component.prototype.validateData = function () {
        this.dispatchImmediately("predatavalidate");
        this.dataInvalid = false;
        $array.remove(system.invalidDatas, this);
        this.dataValidationProgress = 0;
        // need this to slice new data
        this._prevStartIndex = undefined;
        this._prevEndIndex = undefined;
        // todo: this needs some overthinking, maybe some extra settings like zoomOUtonDataupdate like in v3 or so. some charts like pie chart probably should act like this always
        this._startIndex = undefined;
        this._endIndex = undefined;
        if (this.data.length > 0) {
            var preloader = this.preloader;
            // data items array is reset only if all data is validated, if _parseDataFrom is not 0, we append new data only
            if (this._parseDataFrom === 0) {
                this.dataItems.clear();
                // and for all components
                $iter.each(this._dataUsers.iterator(), function (dataUser) {
                    dataUser.dataItems.clear();
                    // need this to slice new data
                    dataUser._prevStartIndex = undefined;
                    dataUser._prevEndIndex = undefined;
                    // todo: this needs some overthinking, maybe some extra settings like zoomOUtonDataupdate like in v3 or so. some charts like pie chart probably should act like this always
                    dataUser._startIndex = undefined;
                    dataUser._endIndex = undefined;
                });
            }
            var counter = 0;
            var startTime = Date.now();
            // parse data
            var i_1 = this._parseDataFrom;
            var n = this.data.length;
            var _loop_1 = function () {
                var rawDataItem = this_1.data[i_1];
                var dataItem = this_1.dataItems.create();
                this_1.processDataItem(dataItem, rawDataItem, i_1);
                $iter.each(this_1._dataUsers.iterator(), function (dataUser) {
                    var dataUserDataItem = dataUser.dataItems.create();
                    dataUser.processDataItem(dataUserDataItem, rawDataItem, i_1);
                });
                counter++;
                // show preloader if this takes too many time
                if (counter == 100) {
                    counter = 0;
                    var elapsed = Date.now() - startTime;
                    if (elapsed > this_1.parsingStepDuration) {
                        if (i_1 < this_1.data.length - 10) {
                            this_1._parseDataFrom = i_1 + 1;
                            // update preloader
                            if (preloader) {
                                if (i_1 / this_1.data.length > 0.5 && !this_1.preloader.visible) {
                                    // do not start showing
                                }
                                else {
                                    preloader.progress = i_1 / this_1.data.length;
                                }
                            }
                            this_1.dataValidationProgress = i_1 / this_1.data.length;
                            i_1 = this_1.data.length; // stops cycle
                            this_1.invalidateData();
                            return { value: void 0 };
                        }
                    }
                }
            };
            var this_1 = this;
            for (i_1; i_1 < n; i_1++) {
                var state_1 = _loop_1();
                if (typeof state_1 === "object")
                    return state_1.value;
            }
            if (preloader) {
                preloader.progress = 1;
            }
        }
        this.dataValidationProgress = 1;
        this._parseDataFrom = 0; // reset this index, it is set to dataItems.length if addData() method was used.
        this.invalidateDataItems();
        this.dispatch("datavalidated");
    };
    /**
     * Validates (processes) data items.
     *
     * @ignore Exclude from docs
     */
    Component.prototype.validateDataItems = function () {
        $array.remove(system.invalidDataItems, this);
        this.dataItemsInvalid = false;
        this.invalidateDataRange();
        this.dispatch("valueschanged");
    };
    Object.defineProperty(Component.prototype, "data", {
        /**
         * Returns element's source (raw) data.
         *
         * @return {any[]} Data
         */
        get: function () {
            if (!this._data) {
                this._data = [];
            }
            return this._data;
        },
        /**
         * Sets source (raw) data for the element. The "data" is always an `Array`
         * of objects.
         *
         * @param {any[]} value Data
         */
        set: function (value) {
            // array might be the same, but there might be items added
            // todo: check if array changed, toString maybe?
            //if (this._data != value) {
            this._data = value;
            this.invalidateData();
            //}
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns (creates if necessary) a [[DataSource]] bound to any specific
     * property.
     *
     * For example if I want to bind `data` to an external JSON file, I'd create
     * a DataSource for it.
     *
     * @param  {string}      property  Property to bind external data to
     * @return {DataSource}            A DataSource for property
     */
    Component.prototype.getDataSource = function (property) {
        var _this = this;
        if (!$type.hasValue(this._dataSources[property])) {
            this._dataSources[property] = new DataSource();
            this._dataSources[property].component = this;
            this.setDataSourceEvents(this._dataSources[property], property);
            this._dataSources[property].adapter.add("dateFields", function (val) {
                return _this.dataSourceDateFields(val);
            });
            this._dataSources[property].adapter.add("numberFields", function (val) {
                return _this.dataSourceNumberFields(val);
            });
            this.events.on("inited", this.loadData, this);
        }
        return this._dataSources[property];
    };
    Object.defineProperty(Component.prototype, "dataSource", {
        /**
         * Returns a [[DataSource]] specifically for loading Component's data.
         *
         * @return {DataSource} Data source
         */
        get: function () {
            if (!this._dataSources["data"]) {
                this.getDataSource("data");
            }
            return this._dataSources["data"];
        },
        /**
         * Sets a [[DataSource]] to be used for loading Component's data.
         *
         * @param {DataSource} value Data source
         */
        set: function (value) {
            if (this._dataSources["data"]) {
                this.removeDispose(this._dataSources["data"]);
            }
            this._dataSources["data"] = value;
            this._dataSources["data"].component = this;
            this.events.on("inited", this.loadData, this);
            this.setDataSourceEvents(value, "data");
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initiates loading of the external data via [[DataSource]].
     *
     * @ignore Exclude from docs
     */
    Component.prototype.loadData = function () {
        this._dataSources["data"].load();
    };
    /**
     * This function is called by the [[DataSource]]'s `dateFields` adapater
     * so that particular chart types can popuplate this setting with their
     * own type-speicifc data fields so they are parsed properly.
     *
     * @ignore Exclude from docs
     * @param  {string[]}  value  Array of date fields
     * @return {string[]}         Array of date fields populated with chart's date fields
     */
    Component.prototype.dataSourceDateFields = function (value) {
        return value;
    };
    /**
     * This function is called by the [[DataSource]]'s `numberFields` adapater
     * so that particular chart types can popuplate this setting with their
     * own type-speicifc data fields so they are parsed properly.
     *
     * @ignore Exclude from docs
     * @param  {string[]}  value  Array of number fields
     * @return {string[]}         Array of number fields populated with chart's number fields
     */
    Component.prototype.dataSourceNumberFields = function (value) {
        return value;
    };
    /**
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param  {string[]}  list        [description]
     * @param  {object}    dataFields  [description]
     * @param  {string[]}  targetList  [description]
     * @return {string[]}              [description]
     */
    Component.prototype.populateDataSourceFields = function (list, dataFields, targetList) {
        $array.each(targetList, function (value) {
            if (dataFields[value] && $array.indexOf(list, dataFields[value]) === -1) {
                list.push(dataFields[value]);
            }
        });
        return list;
    };
    /**
     * Sets events on a [[DataSource]].
     *
     * @ignore Exclude from docs
     */
    Component.prototype.setDataSourceEvents = function (ds, property) {
        var _this = this;
        ds.events.on("start", function (ev) {
            _this.preloader.progress = 0;
            //this.preloader.label.text = this.language.translate("Loading");
        });
        ds.events.on("loadstart", function (ev) {
            _this.preloader.progress = 0.25;
        });
        ds.events.on("loadstop", function (ev) {
            _this.preloader.progress = 0.5;
        });
        ds.events.on("parsestop", function (ev) {
            _this.preloader.progress = 0.75;
        });
        ds.events.on("stop", function (ev) {
            _this.preloader.progress = 1;
        });
        ds.events.on("error", function (ev) {
            _this.preloader.progress = 1;
            _this.showModal(ev.message);
        });
        if (property) {
            ds.events.on("done", function (ev) {
                _this.preloader.progress = 1;
                if (property == "data" && !$type.isArray(ev.data)) {
                    ev.data = [ev.data];
                }
                _this[property] = ev.data;
            });
        }
    };
    Object.defineProperty(Component.prototype, "responsive", {
        /**
         * Returns (creates if necessary) a new [[DataSource]] object for loading
         * external data files.
         *
         * @return {DataSource} Data source
         */
        get: function () {
            if (!this._responsive) {
                this._responsive = new Responsive();
                this._responsive.component = this;
            }
            return this._responsive;
        },
        /**
         * Sets a [[Responsive]] instance to be used when applying conditional
         * property values.
         *
         * @param {Responsive} value Data source
         */
        set: function (value) {
            this._responsive = value;
            this._responsive.component = this;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets current zoom.
     *
     * The range uses relative values from 0 to 1, with 0 marking beginning and 1
     * marking end of the available data range.
     *
     * @param  {IRange}  range          Range
     * @param  {boolean} skipRangeEvent Should rangechanged event not be triggered?
     * @param  {boolean} instantly      Do not animate?
     * @return {IRange}                 Actual mofidied range (taking `maxZoomFactor` into account)
     */
    Component.prototype.zoom = function (range, skipRangeEvent, instantly) {
        var start = range.start;
        var end = range.end;
        var priority = range.priority;
        if (!$type.isNumber(start) || !$type.isNumber(end)) {
            return { start: this.start, end: this.end };
        }
        if (this._finalStart != start || this._finalEnd != end) {
            var maxZoomFactor = this.maxZoomFactor;
            // most likely we are dragging left scrollbar grip here, so we tend to modify end
            if (priority == "start") {
                // add to the end
                if (1 / (end - start) > maxZoomFactor) {
                    end = start + 1 / maxZoomFactor;
                }
                //unless end is > 0
                if (end > 1) {
                    end = 1;
                    start = end - 1 / maxZoomFactor;
                }
            }
            else {
                // remove from start
                if (1 / (end - start) > maxZoomFactor) {
                    start = end - 1 / maxZoomFactor;
                }
                if (start < 0) {
                    start = 0;
                    end = start + 1 / maxZoomFactor;
                }
            }
            this._finalEnd = end;
            this._finalStart = start;
            this.skipRangeEvent = skipRangeEvent;
            if (this.rangeChangeDuration > 0 && !instantly) {
                // todo: maybe move this to Animation
                var rangeChangeAnimation = this.rangeChangeAnimation;
                if (rangeChangeAnimation && rangeChangeAnimation.progress < 1) {
                    var options = rangeChangeAnimation.animationOptions;
                    if (options.length > 1) {
                        if (options[0].to == start && options[1].to == end) {
                            return { start: start, end: end };
                        }
                    }
                }
                this.rangeChangeAnimation = this.animate([{ property: "start", to: start }, { property: "end", to: end }], this.rangeChangeDuration, this.rangeChangeEasing);
            }
            else {
                this.start = start;
                this.end = end;
            }
        }
        return { start: start, end: end };
    };
    /**
     * Zooms to specific data items using their index in data.
     *
     * @param {number}  startIndex     Index of the starting data item
     * @param {number}  endIndex       Index of the ending data item
     * @param {boolean} skipRangeEvent Should rangechanged event not be triggered?
     * @param {boolean} instantly      Do not animate?
     */
    Component.prototype.zoomToIndexes = function (startIndex, endIndex, skipRangeEvent, instantly) {
        if (!$type.isNumber(startIndex) || !$type.isNumber(endIndex)) {
            return;
        }
        var start = startIndex / this.dataItems.length;
        var end = endIndex / this.dataItems.length;
        this.zoom({ start: start, end: end }, skipRangeEvent, instantly);
    };
    Object.defineProperty(Component.prototype, "zoomFactor", {
        /**
         * A current zoom factor (0-1). 1 meaning fully zoomed out. (showing all of
         * the available data)
         *
         * @return {number} Zoom factor
         */
        get: function () {
            return $math.fitToRange(1 / (this.end - this.start), 1, this.maxZoomFactor);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "maxZoomFactor", {
        /**
         * Returns max available `zoomFactor`. The element will not allow zoom to
         * occur beyond this factor.
         *
         * @return {number} Maximum `zoomFactor`
         */
        get: function () {
            return this._maxZoomFactor;
        },
        /**
         * Sets max available `zoomFactor`.
         *
         * @param {number} value Maximum `zoomFactor`
         */
        set: function (value) {
            this._maxZoomFactor = value;
            if (this.zoomFactor > value) {
                this.invalidateDataRange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "startIndex", {
        /**
         * Current starting index.
         *
         * @return {number} Start index
         */
        get: function () {
            if (!$type.isNumber(this._startIndex)) {
                this.startIndex = 0;
            }
            return this._startIndex;
        },
        /**
         * Sets current starting index.
         *
         * @ignore Exclude from docs
         * @param {number} value Start index
         */
        set: function (value) {
            this._startIndex = $math.fitToRange(Math.round(value), 0, this.dataItems.length);
            this.start = this._startIndex / this.dataItems.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "endIndex", {
        /**
         * Current ending index.
         *
         * @return {number} End index
         */
        get: function () {
            if (!$type.isNumber(this._endIndex)) {
                this.endIndex = this.dataItems.length;
            }
            return this._endIndex;
        },
        /**
         * Sets current ending index.
         *
         * @ignore Exclude from docs
         * @param {number} value End index
         */
        set: function (value) {
            this._endIndex = $math.fitToRange(Math.round(value), 0, this.dataItems.length);
            this.end = this._endIndex / this.dataItems.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "start", {
        /**
         * Current relative starting position of the data range (zoom).
         *
         * @return {number} Start (0-1)
         */
        get: function () {
            return this._start;
        },
        /**
         * Sets start of the current data range (zoom).
         *
         * @ignore Exclude from docs
         * @param {number} value Start (0-1)
         */
        set: function (value) {
            value = $math.round(value, 5);
            if (1 / (this.end - value) > this.maxZoomFactor) {
                //	value = this.end - 1 / this.maxZoomFactor;
            }
            if (this._start != value) {
                this._start = value;
                this._startIndex = Math.floor(this.dataItems.length * value) || 0;
                this.invalidateDataRange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "end", {
        /**
         * Current relative ending position fo the data range (zoom).
         *
         * @return {number} End (0-1)
         */
        get: function () {
            return this._end;
        },
        /**
         * Sets end of the current data range (zoom).
         *
         * @ignore Exclude from docs
         * @param {number} value End (0-1)
         */
        set: function (value) {
            value = $math.round(value, 5);
            if (1 / (value - this.start) > this.maxZoomFactor) {
                //	value = 1 / this.maxZoomFactor + this.start;
            }
            if (this._end != value) {
                this._end = value;
                this._endIndex = Math.ceil(this.dataItems.length * value) || 0;
                this.invalidateDataRange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "dataDateFormat", {
        /**
         * Format of the dates in source data.
         *
         * @ignore Exclude from docs
         * @deprecated Not used?
         * @return {string} Format of the dates in source data
         */
        get: function () {
            if (!this._dataDateFormat) {
                //return this.parentComponent.dataDateFormat;
            }
            return this._dataDateFormat;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * [removeFromInvalids description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    Component.prototype.removeFromInvalids = function () {
        _super.prototype.removeFromInvalids.call(this);
        $array.remove(system.invalidDatas, this);
        $array.remove(system.invalidSprites, this);
        $array.remove(system.invalidDataItems, this);
        $array.remove(system.invalidDataRange, this);
    };
    Object.defineProperty(Component.prototype, "dataItems", {
        /**
         * Returns a list of source [[DataItem]] objects.
         *
         * @return {OrderedListTemplate} List of data items
         * @todo Check if we can automatically dispose all of the data items when Component is disposed
         */
        get: function () {
            if (!this._dataItems) {
                this._dataItems = new OrderedListTemplate(this.createDataItem());
                this._dataItems.events.on("insert", this.handleDataItemAdded, this);
                this._dataItems.events.on("remove", this.invalidateDataItems, this);
                //this._disposers.push(new ListDisposer(this._dataItems));
            }
            return this._dataItems;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Processes newly added [[DataItem]] as well as triggers data re-validation.
     *
     * @ignore Exclude from docs
     * @param {IListEvents<DataItem>["insert"]} event [description]
     */
    Component.prototype.handleDataItemAdded = function (event) {
        event.newValue.component = this;
        this.invalidateDataItems();
    };
    Object.defineProperty(Component.prototype, "dataMethods", {
        /**
         * [dataMethods description]
         *
         * @ignore Exclude from docs
         * @todo Description
         * @deprecated Not used?
         * @param {Dictionary} List of data methods
         */
        get: function () {
            if (!this._dataMethods) {
                this._dataMethods = new Dictionary();
            }
            return this._dataMethods;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Binds a data element's field to a specific field in raw data.
     * For example, for the very basic column chart you'd want to bind a `value`
     * field to a field in data, such as `price`.
     *
     * Some more advanced Components, like [[CandlestickSeries]] need several
     * data fields bound to data, such as ones for open, high, low and close
     * values.
     *
     * @todo Example
     * @param {Key}                       field  Field name
     * @param {this["_dataFields"][Key]}  value  Field name in data
     */
    Component.prototype.bindDataField = function (field, value) {
        this.dataFields[field] = value;
        this.invalidateDataRange();
    };
    /**
     * Invalidates processed data.
     *
     * @ignore Exclude from docs
     */
    Component.prototype.invalidateProcessedData = function () {
        this.resetProcessedRange();
        this.invalidateDataRange();
    };
    /**
     * [resetProcessedRange description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    Component.prototype.resetProcessedRange = function () {
        this._prevEndIndex = null;
        this._prevStartIndex = null;
    };
    Object.defineProperty(Component.prototype, "dataUsers", {
        /**
         * Returns all other [[Component]] objects that are using this element's
         * data.
         *
         * @ignore Exclude from docs
         * @todo Description (review)
         * @return {List<Component>} [description]
         */
        get: function () {
            return this._dataUsers;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns a clone of this element.
     *
     * @return {this} Clone
     */
    Component.prototype.clone = function () {
        var component = _super.prototype.clone.call(this);
        component.dataFields = $utils.copyProperties(this.dataFields, {});
        return component;
    };
    /**
     * Invalidates the whole element, including all its children, causing
     * complete re-parsing of data and redraw.
     *
     * Use sparingly!
     */
    Component.prototype.reinit = function () {
        this._inited = false;
        this.deepInvalidate();
    };
    Object.defineProperty(Component.prototype, "exporting", {
        /**
         * Returns an [[Export]] instance.
         *
         * If it does not exist it looks in parents. It also adds "data" Adapter so
         * that Export can access Component's data.
         *
         * @return {Export} Export instance
         */
        get: function () {
            var _this = this;
            var _export = this._exporting.get();
            if (_export) {
                return _export;
            }
            else {
                if (this.parent) {
                    _export = this.parent.exporting;
                }
                else {
                    _export = new Export();
                    _export.container = this.svgContainer;
                    _export.sprite = this;
                }
                this._exporting.set(_export, _export);
                _export.adapter.add("data", function (arg) {
                    arg.data = _this.data;
                    return arg;
                });
            }
            return _export;
        },
        enumerable: true,
        configurable: true
    });
    return Component;
}(Container));
export { Component };
//# sourceMappingURL=Component.js.map