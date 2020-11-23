requestData.toSendDataMilestone = SubProcessItem.MilestoneTitle[x];
            for (y = 0; y < ProcessTitleCount.length - 1; y = y + 2) //Перебор второго массива с титлами Процесса
            {
                if (ProcessTitleCount[y] >= SubProcessItem.MilestoneTitleCount[x]
                    && ProcessTitleCount[y + 1] <= SubProcessItem.MilestoneTitleCount[x + 1]) {
                    for (let z = ProcessTitleCount[y] + 1; z < ProcessTitleCount[y + 1]; z++) //Перебор одного блока массива
                    {
                        requestData.toSendDataProcess.push(SubProcessItem.Name[z][0]);
                        requestData.toSendDataPractice.push(SubProcessItem.Practice[z][0]);
                        requestData.toSendDataUser.push(SubProcessItem.User[z][0]);
                        
                    }
                }
            }
