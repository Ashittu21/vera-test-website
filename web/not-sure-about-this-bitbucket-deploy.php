    <?php
	switch ($_SERVER['SERVER_NAME']) {
		case 'www.vera.org':
			$this_branch = 'master';
			break;
		case 'staging.vera.org':
			$this_branch = 'staging';
			break;
		default:
			$this_branch = 'master';
	}
	
    $repo_dir = '/srv/users/serverpilot/apps/vera/repo';
    $web_root_dir = '/srv/users/serverpilot/apps/vera/source';

    // Full path to git binary is required if git is not in your PHP user's path. Otherwise just use 'git'.
    $git_bin_path = 'git';

    $update = false;

    // Parse data from Bitbucket hook payload
    $payload = json_decode($_POST['payload']);

    if (empty($payload->commits)){
      // When merging and pushing to bitbucket, the commits array will be empty.
      // In this case there is no way to know what branch was pushed to, so we will do an update.
      $update = true;
    } else {
      foreach ($payload->commits as $commit) {
        $branch = $commit->branch;
        if ($branch === $this_branch || isset($commit->branches) && in_array($this_branch, $commit->branches)) {
          $update = true;
          break;
        }
      }
    }

    if ($update) {
      // Do a git checkout to the web root
      exec('cd ' . $repo_dir . ' && ' . $git_bin_path  . ' fetch');
      exec('cd ' . $repo_dir . ' && GIT_WORK_TREE=' . $web_root_dir . ' ' . $git_bin_path  . ' checkout -f ' . $this_branch);

      // Log the deployment
      $commit_hash = shell_exec('cd ' . $repo_dir . ' && ' . $git_bin_path  . ' rev-parse --short HEAD');
      file_put_contents('deploy.log', date('m/d/Y h:i:s a') . " Deployed branch: " .  $branch . " Commit: " . $commit_hash . "\n", FILE_APPEND);
    }
    ?>