import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const ProfilPage = () => {
  const auth = useAuthUser();

  return (
    <section className="capitalize">
      <header className='flex items-center justify-between px-12 py-9'>
        <h1 className="text-3xl font-medium text-primary">profil administrator</h1>
      </header>
      <article className="grid grid-cols-3">
        <div className="content-center space-y-5 justify-items-center">
          <img src={auth.user.foto ? `http://localhost:5000/uploads/patient/${auth.user.foto}` : "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="} alt={auth.user.name} className="object-cover object-center rounded-full w-[186px] bg-white" />
          <label for="file-upload" class="custom-file-upload bg-primary text-white rounded-lg px-6 py-2 font-medium capitalize">
            pilih foto
          </label>
          <input id="file-upload" type="file" />
        </div>
        <form className="space-y-10">
          <div>
            <h2 className="text-xl font-bold">nama lengkap</h2>
            <p className="text-xl font-medium text-gray-500">{auth.user.nama}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">username</h2>
            <p className="text-xl font-medium text-gray-500">{auth.user.username}</p>
          </div>
          <button type="submit" className="px-6 py-2 font-medium text-white capitalize rounded-lg bg-primary">ubah sandi</button>
        </form>
      </article>
    </section>
  );
}

export default ProfilPage;