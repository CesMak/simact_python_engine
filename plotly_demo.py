__pragma__('jskeys')  # For convenience, allow JS style unquoted string literals as dictionary keys

import random
import math
import itertools

xValues        = [2 * math.pi * step / 200 for step in range(201)]
fisty_values   = [math.sin(xValue) + 0.5 * math.sin(xValue * 3 + 0.25 * math.sin(xValue * 5)) for xValue in xValues]
secondy_values =[1 if xValue <= math.pi else -1 for xValue in xValues]
yValuesList = [fisty_values,secondy_values]

kind = 'linear'
Plotly.plot(
    kind,
    [
        {
            x: xValues,
            y: yValues
        }
        for yValues in yValuesList
    ],
    {
        title: "my title",
        xaxis: {title: 'U (t) [V]'},
        yaxis: {title: 't [s]'}
    }
)