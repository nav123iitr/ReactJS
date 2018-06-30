#include<bits/stdc++.h>
using namespace std;
int main()
{
int a, b;
cin>>a>>b;
string x=to_string(a);
string y=to_string(b);
string z;
int n=min(x.length(), y.length());
for (int i=0; i<n; i++)
{
z.push_back(x[i]);
z.push_back(y[i]);
}
if (x.length!=n)
for (int i=n; i<x.length(); i++)
z.push_back(x[i]);
if (y.length!=n)
for (int i=n; i<y.length(); i++)
z.push_back(y[i]);
long long ans=stoll(z);
if (ans>100000000)
cout<<-1;
else
cout<<ans;
}