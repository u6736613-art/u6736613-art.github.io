val student = (6736613, "Aura", "3.95", 22, "Bangkok, Thailand","u6736613@au.edu");
val l1 = [1,2,3,4,5];
val fruits = ["Apple","Banana","Orange","Mango","Grapes"];
hd fruits;
hd(tl fruits);
hd(tl (tl fruits));
hd(tl (tl (tl fruits)));
hd(tl (tl (tl (tl fruits))));
fun cube x = x*x*x;
cube 5;
fun identity x = x;
fun constantTrue _ = true;
fun isZero 0 = "Zero" | isZero _ = "Not Zero";
fun addTwo (a,b) = a+b;
fun getFirst [] = raise Empty | getFirst (x::xs) = x;
identity 42;
constantTrue 5;
isZero 0;
addTwo(10,20);
getFirst[1,2,3,4];
fun factorial 0 = 1
    |factorial n = n*factorial(n-1)

fun double x = x * 2;
fun cube x = x * x * x;
fun max (x, y) = if x > y then x else y;
fun isEven x = (x mod 2 = 0);

fn x => x * 2;
fn x => x * x * x;
fn (x, y) => if x > y then x else y;
fn x => (x mod 2 = 0);
fn (x, y) => if x > y then x else y;

map (fn x => x * 2) [1, 2, 3, 4];
map (fn x => x * x * x) [1, 2, 3, 4];
map (fn x => x + 100) [1, 2, 3, 4];
map (fn x => ~x) [1, 2, 3, 4];

fun squareList lst = map (fn x => x * x) lst;
fun totalSalary salaries = foldl (fn (sal, acc) => sal + acc) 0 salaries;
fun reverseEvaluation lst = foldl (fn (x, acc) => x :: acc) [] lst;

structure BankingSystem = 
struct
    type accountId = int
    type balance = real

    fun deposit (amt, bal) = bal + amt
    fun withdraw (amt, bal) = if bal >= amt then bal - amt else bal
end;

structure StudentSystem = 
struct
    type studentId = int
    type gpa = real

    fun updateGPA (currentGPA, newCredits) = (* logic here *) currentGPA
    fun isHonorRoll (studentGPA) = studentGPA >= 3.5
end;

structure LibrarySystem = 
struct
    type bookId = int
    type isAvailable = bool

    fun checkoutBook (id) = false
    fun returnBook (id) = true
end;