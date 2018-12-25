# canvas_snow
canvas 实现的简单下雪效果


## demo

[demo]()

## install and run

```bash
    npm install
    npm run start
```

## build

```bash
    npm run build
```

## usage

``` typescript
    import Snow from '../src/snow';

    const snow = new Snow({
        container: document.body,
    });

    snow.start();
```

## options

``` typescript
    const snow = new Snow(options:SnowOptions)
```

| option name               | type          | default| is required |
| --------------------------|:-------------:| ------:|--------------|
| container                 | HTMLElement   | null   | true
| canvasClass               | string        | null   | false
| stopWhenVisibilityChange  | boolean       | true   | false
| quantity                  | number (1-10) | 5      | false   
| speed                     | number (1-100)| 5      | false       

## api

### start

```ts
    snow.start();
```
### stop

```ts
    snow.stop();
```

### changeSpeed


```ts
    /**
     * @params {number} speed 1-10
     */
    snow.changeSpeed(5);
```
### changeQuantity

```ts
    /**
     * @params {number} quantity 1-100
     */
    snow.changeQuantity(5);
```



