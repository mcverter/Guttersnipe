/**
 * Created by mitchell on 1/23/2017.

import 'fs'

for directory in current directory
list directories
if directory is directory
checkfile
recursive patj

function checkFile(filename, source_path, test_path) {
    if (! -e source_path + filename) {
        return source_path + filename does not exist
    }
     if (! -e test_path + filename) {
        return test_path + filename does not exist
    }

    if (isFile(full_test_path) && isFile(full_source_path)) {
        return true;
    }

    if (-d full_test_path && ! -d full_source_path) {
        Error:  full_test_path is directory but full_source path is not
    }
    if (! -d full_test_path && -d full_source_path) {
        Error:  full_test_path is directory but full_source path is not
    }

    if (-d full_test_path) {
        for file in full_test_path {
            checkFile(file, source_path + filename, test_path + filename)
        }
    }

}

 */