/**
 * Candlestick Series module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { ColumnSeries, ColumnSeriesDataItem, IColumnSeriesDataFields, IColumnSeriesProperties, IColumnSeriesAdapters, IColumnSeriesEvents } from "./ColumnSeries";
import { Line } from "../../core/elements/Line";
import { ListTemplate } from "../../core/utils/List";
import { Container } from "../../core/Container";
import * as $iter from "../../core/utils/Iterator";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[CandlestickSeries]].
 *
 * @see {@link DataItem}
 */
export declare class CandlestickSeriesDataItem extends ColumnSeriesDataItem {
    /**
     * Defines a type of [[Component]] this data item is used for
     * @type {CandlestickSeries}
     * @todo Disabled to work around TS bug (see if we can re-enable it again)
     */
    /**
     * Constructor
     */
    constructor();
    /**
     * @return {number} Value
     */
    /**
     * Low value for horizontal axis.
     *
     * @param {number}  value  Value
     */
    lowValueX: number;
    /**
     * @return {number} Value
     */
    /**
     * Low value for vertical axis.
     *
     * @param {number}  value  Value
     */
    lowValueY: number;
    /**
     * @return {number} Value
     */
    /**
     * High value for horizontal axis.
     *
     * @param {number}  value  Value
     */
    highValueX: number;
    /**
     * @return {number} Value
     */
    /**
     * High value for vertical axis.
     *
     * @param {number}  value  Value
     */
    highValueY: number;
    /**
     * @return {number} Value
     */
    /**
     * Close value for horizontal axis.
     *
     * This is an alias for `valueX` added for convenience only.
     *
     * @param {number}  value  Value
     */
    closeValueX: number;
    /**
     * @return {number} Value
     */
    /**
     * Close value for vertical axis.
     *
     * This is an alias for `valueX` added for convenience only.
     *
     * @param {number}  value  Value
     */
    closeValueY: number;
}
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines data fields for [[CandlestickSeries]].
 */
export interface ICandlestickSeriesDataFields extends IColumnSeriesDataFields {
    /**
     * Field name in data which holds low numeric value for horizontal axis.
     *
     * @type {number}
     */
    lowValueX?: string;
    /**
     * Field name in data which holds low numeric value for vertical axis.
     *
     * @type {number}
     */
    lowValueY?: string;
    /**
     * Field name in data which holds high numeric value for horizontal axis.
     *
     * @type {number}
     */
    highValueX?: string;
    /**
     * Field name in data which holds low numeric value for vertical axis.
     *
     * @type {number}
     */
    highValueY?: string;
    /**
     * Field name in data which holds low date for horizontal axis.
     *
     * @type {number}
     */
    lowDateX?: string;
    /**
     * Field name in data which holds low date for vertical axis.
     *
     * @type {number}
     */
    lowDateY?: string;
    /**
     * Field name in data which holds high date for horizontal axis.
     *
     * @type {number}
     */
    highDateX?: string;
    /**
     * Field name in data which holds high date for vertical axis.
     *
     * @type {number}
     */
    highDateY?: string;
}
/**
 * Defines properties for [[CandlestickSeries]].
 */
export interface ICandlestickSeriesProperties extends IColumnSeriesProperties {
}
/**
 * Defines events for [[CandlestickSeries]].
 */
export interface ICandlestickSeriesEvents extends IColumnSeriesEvents {
}
/**
 * Defines adapters for [[CandlestickSeries]].
 *
 * @see {@link Adapter}
 */
export interface ICandlestickSeriesAdapters extends IColumnSeriesAdapters, ICandlestickSeriesProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines [[Series]] for a candlestick graph.
 *
 * @see {@link ICandlestickSeriesEvents} for a list of available Events
 * @see {@link ICandlestickSeriesAdapters} for a list of available Adapters
 * @todo Example
 * @important
 */
export declare class CandlestickSeries extends ColumnSeries {
    /**
     * Defines available data fields.
     *
     * @ignore Exclude from docs
     * @type {ICandlestickSeriesDataFields}
     */
    _dataFields: ICandlestickSeriesDataFields;
    /**
     * Defines available properties.
     *
     * @ignore Exclude from docs
     * @type {ICandlestickSeriesProperties}
     */
    _properties: ICandlestickSeriesProperties;
    /**
     * Defines available adapters.
     *
     * @ignore Exclude from docs
     * @type {ICandlestickSeriesAdapters}
     */
    _adapter: ICandlestickSeriesAdapters;
    /**
     * Event dispacther.
     *
     * @type {SpriteEventDispatcher<AMEvent<CandlestickSeries, ICandlestickSeriesEvents>>} Event dispatcher instance
     * @todo Disabled to work around TS bug (see if we can re-enable it again)
     */
    /**
     * Defines the type of data item.
     *
     * @ignore Exclude from docs
     * @type {CandlestickSeriesDataItem}
     */
    _dataItem: CandlestickSeriesDataItem;
    /**
     * A data field to look for "low" value for horizontal axis.
     */
    protected _xLowField: keyof this["_dataFields"];
    /**
     * A data field to look for "low" value for vertical axis.
     */
    protected _yLowField: keyof this["_dataFields"];
    /**
     * A data field to look for "high" value for horizontal axis.
     */
    protected _xHighField: keyof this["_dataFields"];
    /**
     * A data field to look for "high" value for vertical axis.
     */
    protected _yHighField: keyof this["_dataFields"];
    /**
     * Internal iterator.
     */
    protected _highLinesIterator: $iter.ListIterator<Line>;
    /**
     * Internal iterator.
     */
    protected _lowLinesIterator: $iter.ListIterator<Line>;
    /**
     * List of "low" line elements.
     *
     * @type {ListTemplate<Line>}
     */
    protected _lowLines: ListTemplate<Line>;
    /**
     * List of "high" line elements.
     *
     * @type {ListTemplate<Line>}
     */
    protected _highLines: ListTemplate<Line>;
    /**
     * Constructor
     */
    constructor();
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    protected applyInternalDefaults(): void;
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return {CandlestickSeriesDataItem} Data Item
     */
    protected createDataItem(): this["_dataItem"];
    /**
     * Validates data item's element, effectively redrawing it.
     *
     * @ignore Exclude from docs
     * @param {CandlestickSeriesDataItem}  dataItem  Data item
     */
    validateDataElement(dataItem: this["_dataItem"]): void;
    /**
     * (Re)validates the whole series, effectively causing it to redraw.
     *
     * @ignore Exclude from docs
     */
    validate(): void;
    /**
     * A data field to look for "low" value for horizontal axis.
     *
     * @ignore Exclude from docs
     * @return {string} Field name
     */
    readonly xLowField: string;
    /**
     * A data field to look for "low" value for vertical axis.
     *
     * @ignore Exclude from docs
     * @return {string} Field name
     */
    readonly yLowField: string;
    /**
     * A data field to look for "high" value for horizontal axis.
     *
     * @ignore Exclude from docs
     * @return {string} Field name
     */
    readonly xHighField: string;
    /**
     * A data field to look for "high" value for vertical axis.
     *
     * @ignore Exclude from docs
     * @return {string} Field name
     */
    readonly yHighField: string;
    /**
     * Sets up which data fields to use for data access.
     */
    protected defineFields(): void;
    /**
     * List of "low" line elements.
     *
     * @ignore Exclude from docs
     * @return {ListTemplate<Line>} Element list
     */
    readonly lowLines: ListTemplate<Line>;
    /**
     * List of "high" line elements.
     *
     * @ignore Exclude from docs
     * @return {ListTemplate<Line>} Element list
     */
    readonly highLines: ListTemplate<Line>;
    /**
     * Creates elements in related legend container, that mimics the look of this
     * Series.
     *
     * @ignore Exclude from docs
     * @param {Container}  marker  Legend item container
     */
    createLegendMarker(marker: Container): void;
}
