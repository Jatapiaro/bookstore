<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Section extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $data = parent::toArray($request);
        $data['books'] = $this->customBooks();
        $data['room'] = $this->customRoom();
        return $data;
    }
}
