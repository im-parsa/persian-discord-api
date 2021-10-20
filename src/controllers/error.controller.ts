export const get404 = async (req: any, res: any) =>
{
    res.render(`error.ejs`,
        {
            error:
                {
                  E404: true,
                  title: "Sorry! The page you’re looking for cannot be found."
                }
        });
};
