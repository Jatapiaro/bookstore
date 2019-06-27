import React, { Component } from 'react';

export default class Datepicker extends Component {

    static defaultProps = {
        dayName: "day",
        monthName: "month",
        yearName: "year",
        maxYear: 2019,
        minYear: 1000,
        defaultDate: new Date(),
        error: null,
        onChange: null
    }

    state = {
        currentDate: new Date(),
        updateState: true,
        count: 0,
    }

    constructor(props) {
        super(props);
        this.handlerChangeDays = this.handlerChangeDays.bind(this);
        this.handlerChangeMonths = this.handlerChangeMonths.bind(this);
        this.handlerChangeYears = this.handlerChangeYears.bind(this);
    }

    componentWillReceiveProps(props) {
        if (!this.state.updateState) {
            return;
        }
        if (!props.edit) {
            this.setState({
                currentDate: props.defaultDate,
                updateState: false
            });
        } else {
            let d = props.defaultDate;
            let date = {
                day: d.day(),
                month: d.month(),
                year: d.year()
            }
            this.handlerChangeAll(date);
        }
    }

    handlerChangeAll(dat) {
        let date = new Date(this.state.currentDate);
        let d = Number(dat.day);
        date.setDate(d);
        let m = Number(dat.month);
        m = m - 1;
        date.setMonth(m);
        let y = Number(dat.year);
        date.setFullYear(y);
        let count = this.state.count;
        count++;
        let updateState = (count == 2)? false : true;
        this.setState({ currentDate: date, count: count, updateState: updateState}, () => {
            this.props.onChange && this.props.onChange(this.state.currentDate);
        });
    }

    /**
     * Handles when the day is changed
     * @param {Event} e
     */
    handlerChangeDays(e) {
        this.updateCurrentDate('day', e.target.value);
    }

    /**
     * Handles when the month is changed
     * @param {Event} e
     */
    handlerChangeMonths(e) {
        this.updateCurrentDate('month', e.target.value);
    }

    /**
     * Handles when the year is changed
     * @param {Event} e
     */
    handlerChangeYears(e) {
        this.updateCurrentDate('year', e.target.value);
    }

    /**
     * Renders a range of options (0, 1)
     * @param {number} from
     * @param {number} to
     * @param {number} selected
     */
    renderRangeOptions(from, to) {
        let options = [];
        for (let i = from; i < (to + 1); i++) {
            options.push(
                <option
                    value={i}
                    key={i}>
                    {i}
                </option>
            );
        }
        return options;
    }

    render() {
        let monthsLabels = ['Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Septiembre',
            'Octubre',
            'Noviembre',
            'Diciembre'];
        let date = this.state.currentDate;
        if (!(date instanceof Date && !isNaN(date))) {
            date = new Date();
        }
        let showError = this.props.error != null;
        let selectClassPayload = null;
        if (showError) {
            selectClassPayload = 'is-invalid state-invalid';
        }
        return (
            <div>
                <div className="input-group">
                    <select
                        name={this.props.dayName}
                        onChange={this.handlerChangeDays}
                        className={`form-control custom-select ${selectClassPayload}`}
                        value={date.getDate()}>
                        <option value="">Día</option>
                        {
                            this.renderRangeOptions(1, 31)
                        }
                    </select>
                    <select
                        name={this.props.monthName}
                        onChange={this.handlerChangeMonths}
                        className={`form-control custom-select ${selectClassPayload}`}
                        value={date.getMonth() + 1}>
                        <option value="">Mes</option>
                        {monthsLabels.map((monthLabel, i) =>
                            <option value={i + 1} key={i}>
                                {monthLabel}
                            </option>
                        )}
                    </select>
                    <select
                        name={this.props.yearName}
                        onChange={this.handlerChangeYears}
                        className={`form-control custom-select ${selectClassPayload}`}
                        value={date.getFullYear()}>
                        <option value="">Año</option>
                        {
                            this.renderRangeOptions(this.props.minYear,
                                this.props.maxYear)
                        }
                    </select>
                    <span className="invalid-feedback">
                        {this.props.error}
                    </span>
                </div>
            </div>
        )
    }

    /**
     * Updates the state date given the changes on the handler
     * @param {string} key
     * @param {number} value
     */
    updateCurrentDate(key, value) {
        let date = new Date(this.state.currentDate);
        let v = Number(value);
        if (key === 'day') {
            date.setDate(v);
        }
        if (key === 'month') {
            // Months go from 0 - 12
            v = v - 1;
            date.setMonth(v);
        }
        if (key === 'year') {
            date.setFullYear(v);
        }
        this.setState({ currentDate: date }, () => {
            this.props.onChange && this.props.onChange(this.state.currentDate);
        });
    }

}
