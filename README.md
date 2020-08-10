## General information

The library intended to generate Bootstrap-powered HTML forms using extensible JSON markup

## Document layout
```c
{
    // root block that will be rendered first
    "index": {
        // first element inside block
        {
            // element type
            "type": "elem"
            // extra arguments (see syntax)
        },
        // ...
    },

    // extra template that could be rendered using "ref" type
    "template1": {
        {
            "type": "elem"
            // ...
        },
        // ..
    }
}
```
## Element syntax
### Any element
```c
{
    // defines the element type and the list of available fields
    "type": "elem",
    // set HTML class (see Bootstrap 4 manual)
    "class": "my-class" | [ "class1", "class2" ],
    // set HTML id of element
    "id": "myid",
    // put child elements inside the current (if applicable)
    "children": [ { "type": "elem2" }, { "type": "elem3" } ],
    // custom inner text (if applicable)
    "text": "any text",
    // custom inner HTML code (if applicable)
    "html": "<hr>",
}
```

### Basic HTML elements

#### DIV and SPAN
```c
{
    // use types "div" and "span"
    "type": "div",
    "children": [ ... ]
}
```
### Table elements

#### Table
```c
{
    "type": "table",
    // use dark style
    "dark": bool
}
```
#### Head
Creates HTML `<THEAD>` element. Contains columns and rows
```c
{
    "type": "head",
    // use dark style
    "dark": bool
}
```
#### Body, Rows and Columns
Use types "body", "row" and "col" to create HTML `<TBODY>`, `<TR>`, `<TD>` elements
```c
{
    "type": "body"
    "children": [
        {
            "type": "row",
            children: [
                {
                    "type": "col",
                    "text": "TEST 1"
                },
                {
                    "type": "col",
                    "text": "TEST 2"
                }
            ]
        }
    ]
}
```

### Forms and components

#### Form
```c
{
    "type": "form",
    // set HTML form name
    "name": string,
    // URL to send the submit information
    "action": string
}
```
#### Button
```c
{
    // HTML button type, could be "button", "submit" or "reset"
    "type": "button",
    // visible dimensions: "large", "small", undefined
    "size": "large",
    // visible text displayed on the button
    "text": string,
    // bootstrap modifier: "primary", "secondary", "success", "danger", "warning", "info", "light", "dark"
    "modifier": "primary",
    // make button disabled
    "disabled": bool
}
```
#### Button Group
Allows you to group several buttons into a single block
```c
{
    "type": "button-group",
}
```

#### Checkbox
```c
{
    "type": "checkbox",
    // text to the right of the checkbox
    "label": "Click me",
    // name inside HTML form
    "name": "check1",
    // checked or not (boolean)
    "value": true,
}
```

#### Input
```c
{
    "type": "input",
    // Bootstrap input type (text, password, datetime, datetime-local, date, month, time, week, number, email, url, search, tel, and color are supported)
    "input-type": "number",
    // description text near the input
    "label": "Generic counter",
    // name inside HTML form
    "name": "counter",
    // initial value
    "text": "18",
}
```

### Miscelaneous

#### Bootstrap Card
```c
{
    "type": "card",
    // Text shown in header
    "title": "My Card",
    "children": [ ... ]
}
```

#### Reference
Displays an independent template within a markup file
```c
{
    "type": "ref",
    // Template name
    "name": "template_name",
}
```