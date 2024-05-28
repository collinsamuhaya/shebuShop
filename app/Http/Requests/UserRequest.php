<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
Use Illuminate\Validation\Rules\Password;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required','min:3', 'max:255'],
            //'email' => ['required', 'email'],
            //'phone' => ['nullable','string'],
            //'address' => ['nullable','string'],
            //'userimage' => ['nullable','string'],
            //'password' => ['required', Password::min(8)->numbers()->letters()->symbols()]
        ];
    }
}
