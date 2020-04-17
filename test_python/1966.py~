num = int(input())
print_list = list()
result = list()

for i in range(num):
    info = list(map(int, input().strip().split(' ')))
    index = list(map(int, input().strip().split(' ')))
     
    index = [(i, v) for i, v in enumerate(index)]

    print_list.append([info, index])

for print_data in print_list:

    index = print_data[0][1]
    queue = print_data[1] 
    count = 1
    
    while queue:
        if queue[0] == max(queue, key=lambda x: x[1]):
            if queue[0][0] == index:
                result.append(count)
                break
            else:
                count += 1
                queue.pop(0)
                continue
        else:
           queue.append(queue[0])
           queue.pop(0)

print('\n'.join(map(str, result)))
