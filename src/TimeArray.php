<?php

namespace Mmerlijn\TimeArray;

use Laravel\Nova\Fields\Field;
use Laravel\Nova\Http\Requests\NovaRequest;

class TimeArray extends Field
{
    /**
     * The field's component.
     *
     * @var string
     */
    public $component = 'time-array';

    protected function fillAttributeFromRequest(NovaRequest $request, $requestAttribute, $model, $attribute)
    {
        if ($request->exists($requestAttribute)) {
            $model->{$attribute} = json_decode($request[$requestAttribute]);
        }
    }
}
