import { useId } from "react";

export default function CustomForm() {
  const handleSubmit = (formData: FormData) => {
    // const username1 = formData.get("username1") as string;
    // const username2 = formData.get("username2") as string;
    // const data = { username1, username2 };
    const data = Object.fromEntries(formData);
    console.log(data);
  };

  //   const uniqUsernameId1 = useId();
  //   const uniqUsernameId2 = useId();

  //   const uniqId = useId();

  const getUnicId = useId();
  const uniqId = (name: string) => {
    return `${getUnicId}-${name}`;
  };
  return (
    <>
      <form action={handleSubmit}>
        <label htmlFor={uniqId("username1")}>Username1</label>
        <input type="text" name="username1" id={uniqId("username1")} />
        <label htmlFor={uniqId("username2")}>Username2</label>
        <input type="text" name="username2" id={uniqId("username2")} />
        <label>
          Username3
          <input type="text" name="username3" defaultValue={"John Dou"} />
        </label>

        <button>Submit</button>
      </form>
    </>
  );
}
