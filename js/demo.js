
/**
 * Compare two versions and return the relation as -1 0 or 1 depending on which side is higher
 * Typical usage you would want a zero or higher when comparing versions for match
 * 
 * @param string a Version number 1 without v, example 1.0.4
 * @param string b Version number 2 without v, example 1.0.5
 */
function compareVer(a, b)
{
    //treat non-numerical characters as lower version
    //replacing them with a negative number based on charcode of each character
    function fix(s)
    {
        return "." + (s.toLowerCase().charCodeAt(0) - 2147483647) + ".";
    }
    a = ("" + a).replace(/[^0-9\.]/g, fix).split('.');
    b = ("" + b).replace(/[^0-9\.]/g, fix).split('.');
    var c = Math.max(a.length, b.length);
    for (var i = 0; i < c; i++)
    {
        //convert to integer the most efficient way
        a[i] = ~~a[i];
        b[i] = ~~b[i];
        if (a[i] > b[i])
            return 1;
        else if (a[i] < b[i])
            return -1;
    }
    return 0;
}