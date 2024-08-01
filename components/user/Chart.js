import { useNode } from '@craftjs/core';
import {
    Button as MaterialButton,
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    FormControlLabel,
} from '@material-ui/core';
import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export const Chart = ({ dataSource, ...props }) => {
    const { connectors: { connect, drag } } = useNode();

    const options = [
        {
            title: {
                text: 'Option 1'
            },
            series: [{
                data: [1, 2, 3, 4, 5, 6]
            }]
        },
        {
            title: {
                text: 'Option 2'
            },
            series: [{
                data: [50, 70, 100, 30]
            }]
        },
        {
            title: {
                text: 'Option 2'
            },
            series: [{
                data: [1000, 700, 850, 40, 400, 350, 120, 900]
            }]
        }
    ]
    const index = Number(dataSource) || 0;
    return (
        <div style={{ width: "90%", height: "250px" }} ref={(ref) => connect(drag(ref))}  {...props}>
            <HighchartsReact
                highcharts={Highcharts}
                options={options[index]}
            />
        </div>

        // <h3>Option {dataSource}</h3>
    );
};

export const ChartSettings = () => {
    const node = useNode((node) => ({ props: node.data.props }));
    const { actions: { setProp }, props } = node;

    return (
        <div>
            <FormControl size="small" component="fieldset">
                <FormLabel component="legend">Data source</FormLabel>
                <RadioGroup
                    defaultValue={props.dataSource}
                    onChange={(e) => setProp((props) => (props.dataSource = e.target.value))}
                >
                    <FormControlLabel
                        label="Option-1"
                        value="0"
                        control={<Radio size="Option-1" color="primary" />}
                    />
                    <FormControlLabel
                        label="Option-2"
                        value="1"
                        control={<Radio size="Option-2" color="primary" />}
                    />
                    <FormControlLabel
                        label="Option-3"
                        value="2"
                        control={<Radio size="Option-3" color="primary" />}
                    />
                </RadioGroup>
            </FormControl>
        </div>
    );
};

export const ChartDefaultProps = {
    dataSource: 1
};

Chart.craft = {
    props: ChartDefaultProps,
    related: {
        settings: ChartSettings,
    },
};
