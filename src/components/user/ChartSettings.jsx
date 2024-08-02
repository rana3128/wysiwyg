import React, { useState, useEffect } from 'react';
import { useNode } from '@craftjs/core';
import {
    FormLabel,
    TextField,
    Button,
} from '@material-ui/core';

export const ChartSettings = () => {
    const { actions: { setProp }, props } = useNode((node) => ({ props: node.data.props }));
    const [localSeriesUrls, setLocalSeriesUrls] = useState(props.seriesUrls || []);
    const [url, setUrl] = useState('');

    useEffect(() => {
        console.log(localSeriesUrls);
        setProp((props) => (props.seriesUrls = localSeriesUrls))
    }, [localSeriesUrls, setProp]);

    const handleAddSeries = () => {
        if (url) {
            setLocalSeriesUrls([...localSeriesUrls, url]);
            setUrl('');
        }
    };

    const handleRemoveSeries = (index) => {
        const newSeriesUrls = localSeriesUrls.filter((_, i) => i !== index);
        setLocalSeriesUrls(newSeriesUrls);
    };

    return (
        <div className='cart-setting-panel'>
            <FormLabel component="legend">Series URLs</FormLabel>
            {localSeriesUrls.map((url, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <TextField
                        label={`Series URL ${index + 1}`}
                        value={url}
                        variant="outlined"
                        size="small"
                        fullWidth
                        disabled
                    />
                    <Button
                        onClick={() => handleRemoveSeries(index)}
                        color="secondary"
                        variant="outlined"
                        style={{ marginLeft: '8px' }}
                    >
                        Remove
                    </Button>
                </div>
            ))}
            <TextField
                label="Series URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                variant="outlined"
                size="small"
                fullWidth
                style={{ marginBottom: '8px' }}
            />
            <Button onClick={handleAddSeries} color="primary" variant="contained">
                Add Series
            </Button>
        </div>
    );
};
