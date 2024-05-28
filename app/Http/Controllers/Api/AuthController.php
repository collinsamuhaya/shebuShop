<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Http\Resources\UserCollection;
use app\Http\Requests\UserRequest;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;
class AuthController extends Controller
{

    use HasApiTokens;
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email'=> ['required', 'email'],
            'password' => 'required',
            'remember' => 'boolean'
        ]);
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);
        //if ($credentials->fails()){
           // return response([
            //     'status'=>false,
           //      'message' =>'Credentials error',
            //     'errors' => $credentials->errors()
           // ], 401);
       // }
        if (!Auth::attempt($credentials, $remember)) {
            return response([
                'message' => 'Email or password is incorrect'
            ], 422);
        }
       
        
        $user = Auth::user();
        //if (!$user->is_admin) {
           // Auth::logout();
           // return response([
           //     'message' => 'You don\'t have permission to authenticate as admin'
          //  ], 403);
       // }
       // if (!$user->email_verified_at) {
        //    Auth::logout();
        //    return response([
        //        'message' => 'Your email address is not verified'
        //    ], 403);
       // }

      
        //$token = $user->createToken('main')->plainTextToken;
        $token=$user->createToken(name:'main')->plainTextToken;
        return response([
            'user' => new UserResource($user),
            'token' => $token
        ]);

    }
    /**
     * Display a listing of the resource.
     */
   
     
    public function index()
    {
        //return UserResource::collection(User::all());
        //return UserResource::collection(User::paginate(1));
      // return new UserCollection(User::paginate(5));
       //return response()->json("doctor index");
       $perPage = request('per_page', 10);
       $search = request('search', '');
       $sortField = request('sort_field', 'created_at');
       $sortDirection = request('sort_direction', 'desc');

       $query = User::query()
           ->where('name', 'like', "%{$search}%")
           ->orderBy($sortField, $sortDirection)
           ->paginate($perPage);

       return UserResource::collection($query);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //$user=User::create($request->validated());
        $user= new user;
        
       // $file = $request->file('userimage');
        
       // $imagename=time().'.'.$file->getClientOriginalExtension();
       
       // $request->userimage->move('userimagefolder',$imagename);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->address = $request->address;
        //$user->userimage=$imagename;
        $user->password = bcrypt($request->password);

        $user->save();
         $token=$user->createToken(name:'main')->plainTextToken;
         return response([
            'user'=>$user,
            'token'=>$token
          ]);
      
           // $data = $request->validated();
           // $file = $request->file('userimage');
           // $imagename=time().'.'.$file->getClientoriginalExtension();
           //res.sendFile(__dirname + '/views/index.html');
          //  $request->doctorimage->move((__dirname +'userimagefolder',$imagename);

          //  $user=User::create([
          //  'name'=>$data['name'],
          //  'email'=>$data['email'],
          //  'phone'=>$data['phone'],
          //  'address'=>$data['address'],
          //  'userimage'=>$imagename,
          //  'password'=>bcrypt($data['password'])
 
     // ]);

   
      //$token=$User->createToken(name:'main')->plainTextToken;
      
     // return new UserResource($user);
      //return response([
      //  'token'=>$token
      //]);

    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
        return new UserResource($user);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
        $user->delete();

        return response()->noContent();
    }
}
