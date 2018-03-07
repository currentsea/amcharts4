/**
 * 3D Pie chart module.
 */
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
 * Imports
 * ============================================================================
 * @hidden
 */
import { PieChart, PieChartDataItem } from "./PieChart";
import { PieSeries3D } from "../series/PieSeries3D";
import { system } from "../../core/System";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[PieChart3D]].
 *
 * @see {@link DataItem}
 */
var PieChart3DDataItem = /** @class */ (function (_super) {
    __extends(PieChart3DDataItem, _super);
    /**
     * Constructor
     */
    function PieChart3DDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "PieChart3DDataItem";
        _this.applyTheme();
        return _this;
    }
    return PieChart3DDataItem;
}(PieChartDataItem));
export { PieChart3DDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a 3D Pie chart.
 *
 *  * ```TypeScript
 * // Includes
 * import * as amcharts4 from "@amcharts/amcharts4";
 * import * as pie3d from "@amcharts/amcharts4/pie3d";
 *
 * // Create chart
 * let chart = amcharts4.create("chartdiv", pie3d.Pie3DChart);
 *
 * // Set data
 * chart.data = [{
 * 	"country": "Lithuania",
 * 	"litres": 501.9
 * }, {
 * 	"country": "Czech Republic",
 * 	"litres": 301.9
 * }, {
 * 	"country": "Ireland",
 * 	"litres": 201.1
 * }];
 *
 * // Create series
 * let series = chart.series.push(new pie3d.Pie3DSeries());
 * series.dataFields.value = "litres";
 * series.dataFields.category = "country";
 * ```
 * ```JavaScript
 * // Create chart
 * var chart = amcharts4.create("chartdiv", amcharts4.pie3d.Pie3DChart);
 *
 * // The following would work as well:
 * // var chart = amcharts4.system.create("chartdiv", "Pie3DChart");
 *
 * // Set data
 * chart.data = [{
 * 	"country": "Lithuania",
 * 	"litres": 501.9
 * }, {
 * 	"country": "Czech Republic",
 * 	"litres": 301.9
 * }, {
 * 	"country": "Ireland",
 * 	"litres": 201.1
 * }];
 *
 * // Create series
 * var series = chart.series.push(new amcharts4.pie3d.Pie3DSeries());
 * series.dataFields.value = "litres";
 * series.dataFields.category = "country";
 * ```
 * ```JSON
 * var chart = amcharts4.createFromConfig({
 *
 * 	// Series
 * 	"series": [{
 * 		"type": "Pie3DSeries",
 * 		"dataFields": {
 * 			"value": "litres",
 * 			"category": "country"
 * 		}
 * 	}],
 *
 * 	// Data
 * 	"data": [{
 * 		"country": "Lithuania",
 * 		"litres": 501.9
 * 	}, {
 * 		"country": "Czech Republic",
 * 		"litres": 301.9
 * 	}, {
 * 		"country": "Ireland",
 * 		"litres": 201.1
 * 	}]
 *
 * }, "chartdiv", "Pie3DChart");
 * ```
 *
 * @see {@link IPieChart3DEvents} for a list of available Events
 * @see {@link IPieChart3DAdapters} for a list of available Adapters
 * @important
 */
var PieChart3D = /** @class */ (function (_super) {
    __extends(PieChart3D, _super);
    /**
     * Constructor
     */
    function PieChart3D() {
        var _this = 
        // Init
        _super.call(this) || this;
        _this.className = "PieChart3D";
        _this.depth = 20;
        _this.angle = 10;
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(PieChart3D.prototype, "depth", {
        /**
         * @return {number} Depth (px)
         */
        get: function () {
            return this.getPropertyValue("depth");
        },
        /**
         * Depth of the 3D pie in pixels.
         *
         * This will determine "height" of the pie.
         *
         * @default 20
         * @param {number}  value  Depth (px)
         */
        set: function (value) {
            this.setPropertyValue("depth", value);
            this.invalidateDataUsers();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieChart3D.prototype, "angle", {
        /**
         * @return {number} Angle (degrees)
         */
        get: function () {
            return this.getPropertyValue("angle");
        },
        /**
         * An angle of a "point of view" in degrees.
         *
         * @default 10
         * @param {number}  value  Angle (degrees)
         */
        set: function (value) {
            this.setPropertyValue("angle", value);
            this.invalidateDataUsers();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates and returns a new Series.
     *
     * @return {PieSeries3D} New series
     */
    PieChart3D.prototype.createSeries = function () {
        return new PieSeries3D();
    };
    return PieChart3D;
}(PieChart));
export { PieChart3D };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
system.registeredClasses["PieChart3D"] = PieChart3D;
//# sourceMappingURL=PieChart3D.js.map