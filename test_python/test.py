

input_array = list(map(int, input().strip().split(' ')))

ascending = True
descending = True

for i in range(1, 8):
    if input_array[i-1] > input_array[i]:
        ascending = False
    else:
        descending = False

if ascending:
    print("ascending")
elif descending:
    print("descending")
else:
    print("mixed")